# GridView

```
 GridView(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          mainAxisSpacing: 10,
          crossAxisCount: 3,
          childAspectRatio: 4,
        ),
        children: List.generate(100, (index) => Text("hello world -- $index")),
      ))  
```