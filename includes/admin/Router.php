<?php

namespace MXSFWNWPPGNext\Admin;

use MXSFWNWPPGNext\Admin\Utilities\AdminMenu;
use MXSFWNWPPGNext\Admin\Utilities\Notices\PathNotice;

class Router
{

    protected $rootFolder = 'includes/Admin/controllers/';

    protected $routes = [];

    public function add($controller): object
    {

        $path = MXSFWN_PLUGIN_ABS_PATH . "{$this->rootFolder}{$controller}.php";

        if (!file_exists($path)) {

            PathNotice::throw($path);
        } else {

            $this->routes[] = [
                'path'       => $path,
                'properties' => [],
                'menuAction' => 'addMenuPage'
            ];
        }

        return $this;
    }

    public function get($controller): object
    {

        return $this->add($controller);
    }

    public function properties($attributes): object
    {

        $properties = wp_parse_args($attributes, $this->routes[array_key_last($this->routes)]['properties']);

        $this->routes[array_key_last($this->routes)]['properties'] = $properties;

        return $this;
    }

    public function menuAction($action): object
    {

        $this->routes[array_key_last($this->routes)]['menuAction'] = $action;

        return $this;
    }

    public function route(): void
    {

        foreach ($this->routes as $route) {

            $this->menuPage($route);
        }
    }

    public function menuPage($route): void
    {

        $menuPage = new AdminMenu($route);

        $menuPage->add();
    }
}
