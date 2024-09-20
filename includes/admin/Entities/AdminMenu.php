<?php

/**
 * Class AdminMenu.
 * This class is used to create admin menu items
 * and pages. Generally this class uses Router.php file.
 */

namespace MXSFWNWPPGNext\Admin\Entities;

class AdminMenu
{

    /**
     * List of allowed actions.
     */
    const ACTIONS = [
        'addMenuPage',
        'addSubmenuPage',
        'addOptionsPage',
        'addOptionLink',
    ];

    /**
     * The default action (create a high level menu item).
     */
    protected $menuAction = 'addMenuPage';

    /**
     * Path to controller (file).
     */
    protected $path = NULL;

    /**
     * These properties are used for admin menu
     * and page maintenance.
     */
    protected $properties = [
        'pageTitle'  => 'WPP Generator',
        'menuTitle'  => 'WPP Generator',
        'capability' => 'manage_options',
        'menuSlug'   => 'mxsfwn-admin-page',
        'dashicons'  => 'dashicons-image-filter',
        'position'   => 100,
        'parentSlug' => 'hidden',
    ];

    /** 
     * @param array $menuAttributes   List of menu properties:
     *   [
     *      'file'            Rendered file (includes/Admin/controllers/)
     *      'properties'      List of menu properties:
     *      [
     *          'pageTitle'   Default 'WPP Generator'
     *          'menuTitle'   Default 'WPP Generator'
     *          'capability'  Default 'manage_options' (see https://wordpress.org/documentation/article/roles-and-capabilities/)
     *          'menuSlug'    Default 'mxsfwn-admin-page'
     *          'dashicons'   Default 'dashicons-image-filter'
     *          'position'    Default 100
     *      ]
     *      'menuAction'      Default 'addMenuPage'
     *   ]
     *
     */
    public function __construct($menuAttributes)
    {

        $this->properties = wp_parse_args($menuAttributes['properties'], $this->properties);

        if (in_array($menuAttributes['menuAction'], self::ACTIONS)) {

            $this->menuAction = $menuAttributes['menuAction'];
        }

        $this->path = $menuAttributes['path'];
    }

    /**
     * This function dynamically runs particular
     * menu action (eg. create main menu or sub menu).
     * 
     * @return void   Fire "admin_menu" action.
     */
    public function add(): void
    {

        add_action('admin_menu', [$this, $this->menuAction]);
    }

    /**
     * Add a page and top hierarchy menu item.
     * 
     * @return void   Add menu item to the WP admin panel.
     */
    public function addMenuPage(): void
    {

        add_menu_page(
            sprintf(esc_html__('%s', 'wpp-generator-v2'), $this->properties['pageTitle']),
            sprintf(esc_html__('%s', 'wpp-generator-v2'), $this->properties['menuTitle']),
            $this->properties['capability'],
            $this->properties['menuSlug'],
            [$this, 'render'],
            $this->properties['dashicons'], // icons https://developer.wordpress.org/resource/dashicons/#id
            $this->properties['position']
        );
    }

    /**
     * Add a page and sub menu item.
     * 
     * @return void   Add a sub/hidden menu item to the WP admin panel.
     */
    public function addSubmenuPage(): void
    {

        add_submenu_page(
            $this->properties['parentSlug'],
            sprintf(esc_html__('%s', 'wpp-generator-v2'), $this->properties['pageTitle']),
            sprintf(esc_html__('%s', 'wpp-generator-v2'), $this->properties['menuTitle']),
            $this->properties['capability'],
            $this->properties['menuSlug'],
            [$this, 'render'],
            $this->properties['position']
        );
    }

    /**
     * Add an option menu item.
     * 
     * @return void   Add an option menu item under the Settings menu item.
     */
    public function addOptionsPage(): void
    {

        add_options_page(
            sprintf(esc_html__('%s', 'wpp-generator-v2'), $this->properties['pageTitle']),
            sprintf(esc_html__('%s', 'wpp-generator-v2'), $this->properties['menuTitle']),
            $this->properties['capability'],
            $this->properties['menuSlug'],
            [$this, 'render'],
            $this->properties['position']
        );
    }

    /**
     * Add a link beside Deactivate link on plugins page.
     * 
     * @return void   Add a link to created options page.
     */
    public function addOptionLink(): void
    {

        $baseName = MXSFWN_PLUGIN_BASE_NAME;

        add_filter("plugin_action_links_{$baseName}", [$this, 'addLink']);
    }

    /**
     * Add any number of links below plugin name
     * on plugins page.
     * 
     * @return array    Array of links.
     */
    public function addLink($links): array
    {

        $settingsLink = '<a href="' . get_admin_url() . 'options-general.php?page=' . $this->properties['menuSlug'] . '">' . sprintf(esc_html__('%s', 'wpp-generator-v2'), $this->properties['menuTitle']) . '</a>';

        array_push($links, $settingsLink);

        return $links;
    }

    /**
     * This function requires a file's path.
     * 
     * @return array    Array of links.
     */
    public function render(): void
    {

        if (!file_exists($this->path)) return;

        require_once $this->path;
    }
}
