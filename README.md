### Plugin Structure
```bash
my-plugin/
│
├── assets/
|   ├── images/
|   |   └── example.png
|   |
|   ├── admin/
|   |   ├──  css/
|   |   |   └── styles.css
|   |   └── js/
|   |       └── scripts.js
|   |
|   ├── frontend/
|   |   ├──  css/
|   |   |   └── styles.css
|   |   └── js/
|   |       └── scripts.js
|   |
|   └── packages/
|       ├── font-awesome-4.6.3/
|       |   ├── css/
|       |   |   └── ...
|       |   └── fonts/
|       |       └── ...
|       |
|       └── vue/
|           └── js/
|               ├── development.js
|               └── production.js
│
├── includes/
|   ├── Activate/
|   |   ├── seeder/
|   |   |   └── ai-robots.php
|   |   |   
|   |   ├── CreateDataTable.php
|   |   └── CreateDataTables.php
|   |
|   ├── Admin/
|   |   ├── controllers/
|   |   |   ├── ai-robots-table/
|   |   |   |   ├── action-ai-robot-bulk.php
|   |   |   |   ├── action-ai-robot-store.php
|   |   |   |   ├── action-ai-robot-trash-restore-delete.php
|   |   |   |   ├── action-ai-robot-update.php
|   |   |   |   ├── add-robot.php
|   |   |   |   ├── main.php
|   |   |   |   └── single.php
|   |   |   |
|   |   |   ├── hidden-menu.php
|   |   |   ├── main.php
|   |   |   ├── settings-menu.php
|   |   |   └── sub-menu.php
|   |   |
|   |   ├── Entities/
|   |   |   ├── AdminMenu.php
|   |   |   ├── AdminNotices.php
|   |   |   ├── MetaBox.php
|   |   |   ├── PostType.php
|   |   |   └── Taxonomy.php
|   |   |
|   |   ├── Utilities/
|   |   |   ├── Notices/
|   |   |   |  ├── MetaBoxTypeNotice.php
|   |   |   |  └── PathNotice.php
|   |   |   |
|   |   |   ├── Tables/
|   |   |   |   ├── RobotsDataManager.php
|   |   |   |   └── RobotsTable.php
|   |   |   |
|   |   |   ├── AdminEnqueueScripts.php
|   |   |   ├── MetaBoxGenerator.php
|   |   |   ├── PostTypeGenerator.php
|   |   |   └── TaxonomyGenerator.php
|   |   |
|   |   ├── views/
|   |   |   ├── ai-robots-table/
|   |   |   |   ├── 404.view.php
|   |   |   |   ├── add-robot.view.php
|   |   |   |   ├── main.view.php
|   |   |   |   └── single.view.php
|   |   |   |
|   |   |   ├── meta-boxes/
|   |   |   |   ├── 404.view.php
|   |   |   |   ├── checkbox.view.php
|   |   |   |   ├── email.view.php
|   |   |   |   ├── float.view.php
|   |   |   |   ├── image.view.php
|   |   |   |   ├── int.view.php
|   |   |   |   ├── radio.view.php
|   |   |   |   ├── select.view.php
|   |   |   |   ├── textarea.view.php
|   |   |   |   └── url.view.php
|   |   |   |
|   |   |   ├── hidden-menu.view.php
|   |   |   ├── main.view.php
|   |   |   ├── settings-menu.view.php
|   |   |   └── sub-menu.view.php
|   |   |
|   |   ├── AdminSoul.php
|   │   ├── Router.php
|   |   └── routes.php
|   |
|   ├── Features/
|   |   ├── API/
|   |   |   └── endpoint1.php
|   |   |
|   |   └── Gutenberg/
|   |      └── ...
|   |
|   ├── Frontend/
|   |   ├── components/
|   |   |   └── short-code.php
|   |   |
|   |   ├── Utilities/
|   |   |   └── WPEnqueueScripts.php
|   |   |
|   |   └── FrontendSoul.php
|   |
|   ├── Shared/
|   |   └── functions.php
│   |
│   ├── Activator.php
│   ├── Deactivator.php
│   ├── Uninstall.php
│   └── WppGenerator.php
│   
├── languages/
│   ├── uk_UA.mo
│   └── uk_UA.po
│
├── vendor/
│   └── autoload.php
|
├── screenshots/
│   ├── banner-772x250.jpg
|   ├── banner-1544x500.jpg
|   ├── icon-128x128.jpg
|   ├── icon-256x256.jpg
|   ├── screenshot-1.jpg
|   └── screenshot-2.jpg
│
├── src/
|   ├── admin/
|   |   └── ...
|   └── frontend/
|       └── ...
|
├── composer.json
├── example.gitignore
├── index.php
├── install.php
├── license.txt
├── package.json
├── readme.txt
├── uninstall.php
├── vite.config.js ?
├── my-plugin.php
└── README.md
```