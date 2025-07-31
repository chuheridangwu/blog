# URLSession
原文出自：www.hangge.com  转载请保留原文链接：https://www.hangge.com/blog/cache/detail_2215.html


如何使用原生代码（URLSession）来实现：一次性上传多个文件和多个参数到服务器。
1. 客户端代码（ViewController.swift）
```swift
import UIKit
import MobileCoreServices
 
class ViewController: UIViewController {
     
    @IBAction func startUpload(_ sender: Any) {
         
        //分隔线
        let boundary = "Boundary-\(UUID().uuidString)"
         
        //传递的参数
        let parameters = [
            "value1": "hangge.com",
            "value2": "1234"
        ]
         
        //传递的文件
        let files = [
            (
                name: "file1",
                path:Bundle.main.path(forResource: "1", ofType: "jpg")!
            ),
            (
                name: "file2",
                path:Bundle.main.path(forResource: "2", ofType: "png")!
            )
        ]
         
        //上传地址
        let url = URL(string: "http://www.hangge.com/upload.php")!
        var request = URLRequest(url: url)
        //请求类型为POST
        request.httpMethod = "POST"
        request.setValue("multipart/form-data; boundary=\(boundary)",
            forHTTPHeaderField: "Content-Type")
         
        //创建表单body
        request.httpBody = try! createBody(with: parameters, files: files, boundary: boundary)
         
        //创建一个表单上传任务
        let session = URLSession.shared
        let uploadTask = session.dataTask(with: request, completionHandler: {
            (data, response, error) -> Void in
            //上传完毕后
            if error != nil{
                print(error!)
            }else{
                let str = String(data: data!, encoding: String.Encoding.utf8)
                print("--- 上传完毕 ---\(str!)")
            }
        })
         
        //使用resume方法启动任务
        uploadTask.resume()
    }
     
    //创建表单body
    private func createBody(with parameters: [String: String]?,
                            files: [(name:String, path:String)],
                            boundary: String) throws -> Data {
        var body = Data()
         
        //添加普通参数数据
        if parameters != nil {
            for (key, value) in parameters! {
                // 数据之前要用 --分隔线 来隔开 ，否则后台会解析失败
                body.append("--\(boundary)\r\n")
                body.append("Content-Disposition: form-data; name=\"\(key)\"\r\n\r\n")
                body.append("\(value)\r\n")
            }
        }
         
        //添加文件数据
        for file in files {
            let url = URL(fileURLWithPath: file.path)
            let filename = url.lastPathComponent
            let data = try Data(contentsOf: url)
            let mimetype = mimeType(pathExtension: url.pathExtension)
             
            // 数据之前要用 --分隔线 来隔开 ，否则后台会解析失败
            body.append("--\(boundary)\r\n")
            body.append("Content-Disposition: form-data; "
                + "name=\"\(file.name)\"; filename=\"\(filename)\"\r\n")
            body.append("Content-Type: \(mimetype)\r\n\r\n") //文件类型
            body.append(data) //文件主体
            body.append("\r\n") //使用\r\n来表示这个这个值的结束符
        }
         
        // --分隔线-- 为整个表单的结束符
        body.append("--\(boundary)--\r\n")
        return body
    }
     
    //根据后缀获取对应的Mime-Type
    func mimeType(pathExtension: String) -> String {
        if let uti = UTTypeCreatePreferredIdentifierForTag(kUTTagClassFilenameExtension,
                                                           pathExtension as NSString,
                                                           nil)?.takeRetainedValue() {
            if let mimetype = UTTypeCopyPreferredTagWithClass(uti, kUTTagClassMIMEType)?
                .takeRetainedValue() {
                return mimetype as String
            }
        }
        //文件资源类型如果不知道，传万能类型application/octet-stream，服务器会自动解析文件类
        return "application/octet-stream"
    }
}
 
//扩展Data
extension Data {
    //增加直接添加String数据的方法
    mutating func append(_ string: String, using encoding: String.Encoding = .utf8) {
        if let data = string.data(using: encoding) {
            append(data)
        }
    }
}
```

2. 服务端代码（upload.php）
```php
<?
$value1 = $_POST["value1"];
$value2 = $_POST["value2"];
  
move_uploaded_file($_FILES["file1"]["tmp_name"],
    $_SERVER["DOCUMENT_ROOT"]."/uploadFiles/" . $_FILES["file1"]["name"]);
 
move_uploaded_file($_FILES["file2"]["tmp_name"],
    $_SERVER["DOCUMENT_ROOT"]."/uploadFiles/" . $_FILES["file2"]["name"]);
 
echo "\r\n两个参数为：".$value1."，".$value2;
echo "\r\n两个文件为：". $_FILES["file1"]["name"]."，".$_FILES["file2"]["name"];
?>
```

## 上传时附带上传进度
如果想在上传的过程中实时获取当前进度，就不能使用全局的 `URLSession.shared` 和 `dataTask` 方法，而需使用自定义的 `URLSession` 对象和并实现相关的代理方法。
```swift
import UIKit
import MobileCoreServices
 
class ViewController: UIViewController {
     
    @IBAction func startUpload(_ sender: Any) {
         
        //分隔线
        let boundary = "Boundary-\(UUID().uuidString)"
         
        //传递的参数
        let parameters = [
            "value1": "hangge.com",
            "value2": "1234"
        ]
         
        //传递的文件
        let files = [
            (
                name: "file1",
                path:Bundle.main.path(forResource: "1", ofType: "jpg")!
            ),
            (
                name: "file2",
                path:Bundle.main.path(forResource: "2", ofType: "png")!
            )
        ]
         
        //上传地址
        let url = URL(string: "http://www.hangge.com/upload.php")!
        var request = URLRequest(url: url)
        //请求类型为POST
        request.httpMethod = "POST"
        request.setValue("multipart/form-data; boundary=\(boundary)",
            forHTTPHeaderField: "Content-Type")
         
        //创建表单body
        request.httpBody = try! createBody(with: parameters, files: files, boundary: boundary)
         
        //创建一个表单上传任务
        let session = URLSession(configuration: .default, delegate: self, delegateQueue: nil)
        let uploadTask = session.dataTask(with: request, completionHandler: {
            (data, response, error) -> Void in
            //上传完毕后
            if error != nil{
                print(error!)
            }else{
                let str = String(data: data!, encoding: String.Encoding.utf8)
                print("--- 上传完毕 ---\(str!)")
            }
        })
         
        //使用resume方法启动任务
        uploadTask.resume()
    }
     
    //创建表单body
    private func createBody(with parameters: [String: String]?,
                            files: [(name:String, path:String)],
                            boundary: String) throws -> Data {
        var body = Data()
         
        //添加普通参数数据
        if parameters != nil {
            for (key, value) in parameters! {
                // 数据之前要用 --分隔线 来隔开 ，否则后台会解析失败
                body.append("--\(boundary)\r\n")
                body.append("Content-Disposition: form-data; name=\"\(key)\"\r\n\r\n")
                body.append("\(value)\r\n")
            }
        }
         
        //添加文件数据
        for file in files {
            let url = URL(fileURLWithPath: file.path)
            let filename = url.lastPathComponent
            let data = try Data(contentsOf: url)
            let mimetype = mimeType(pathExtension: url.pathExtension)
             
            // 数据之前要用 --分隔线 来隔开 ，否则后台会解析失败
            body.append("--\(boundary)\r\n")
            body.append("Content-Disposition: form-data; "
                + "name=\"\(file.name)\"; filename=\"\(filename)\"\r\n")
            body.append("Content-Type: \(mimetype)\r\n\r\n") //文件类型
            body.append(data) //文件主体
            body.append("\r\n") //使用\r\n来表示这个这个值的结束符
        }
         
        // --分隔线-- 为整个表单的结束符
        body.append("--\(boundary)--\r\n")
        return body
    }
     
    //根据后缀获取对应的Mime-Type
    func mimeType(pathExtension: String) -> String {
        if let uti = UTTypeCreatePreferredIdentifierForTag(kUTTagClassFilenameExtension,
                                                           pathExtension as NSString,
                                                           nil)?.takeRetainedValue() {
            if let mimetype = UTTypeCopyPreferredTagWithClass(uti, kUTTagClassMIMEType)?
                .takeRetainedValue() {
                return mimetype as String
            }
        }
        //文件资源类型如果不知道，传万能类型application/octet-stream，服务器会自动解析文件类
        return "application/octet-stream"
    }
}
 
extension ViewController: URLSessionDelegate, URLSessionTaskDelegate {
    //上传代理方法，监听上传进度
    func urlSession(_ session: URLSession, task: URLSessionTask,
                    didSendBodyData bytesSent: Int64, totalBytesSent: Int64,
                    totalBytesExpectedToSend: Int64) {
        //获取进度
        let written = (Float)(totalBytesSent)
        let total = (Float)(totalBytesExpectedToSend)
        let pro = written/total
        print("当前进度：\(pro)")
    }
}
 
//扩展Data
extension Data {
    //增加直接添加String数据的方法
    mutating func append(_ string: String, using encoding: String.Encoding = .utf8) {
        if let data = string.data(using: encoding) {
            append(data)
        }
    }
}
```


* [Swift - 使用原生方式同时上传多个文件和参数（form表单提交、post方式）](https://www.hangge.com/blog/cache/detail_2215.html)