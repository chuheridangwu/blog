from playwright.sync_api import sync_playwright

USERNAME = '153100950@qq.com'
PASSWORD = 'mao123456'
GITEE_PAGES_URL = 'https://gitee.com/pandauser/Lean/pages'


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto('https://gitee.com/login')
        page.click('input[name="user[login]"]');
        page.fill('input[name="user[login]"]', USERNAME);
        page.click('input[name="user[login]"]');
        page.fill('input[name="user[password]"]', PASSWORD);
        page.click("input[value='登 录']")
        page.wait_for_timeout(5000)
        page.goto(GITEE_PAGES_URL)
        page.on("dialog", lambda dialog: dialog.accept())
        page.click(".update_deploy")
        page.wait_for_selector('span:text("已开启 Gitee Pages 服务")', timeout=60 * 1000, state='visible')
        #browser.close()


if __name__ == '__main__':
    main()
