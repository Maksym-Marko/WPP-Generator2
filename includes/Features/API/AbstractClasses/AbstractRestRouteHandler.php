<?php

/**
 * The AbstractRestRouteHandler abstract class.
 *
 * This abstract class helps to organize
 * the new endpoints creation.
 */

namespace MXSFWNWPPGNext\Features\API\AbstractClasses;

use MXSFWNWPPGNext\Features\API\Interfaces\RestRouteHandlerInterface;
use WP_REST_Response;

abstract class AbstractRestRouteHandler implements RestRouteHandlerInterface
{

    /**
     * Namespace.
     *
     * @var string
     */
    protected $namespace = 'wpp-generator/v1';

    /**
     * Route.
     *
     * @var string
     */
    protected $route;

    /**
     * Method.
     *
     * @var string
     */
    protected $methods   = 'POST';

    /**
     * Nonce action.
     *
     * @var string
     */
    protected $nonceAction = 'wp_rest';

    /**
     * Register new endpoint.
     * 
     * @return void
     */
    public function registerRoute(): void
    {

        register_rest_route(
            $this->namespace,
            $this->route,
            [
                'methods'             => $this->methods,
                'callback'            => [$this, 'handleRequest'],
                'permission_callback' => [$this, 'checkPermissions'],
            ]
        );
    }

    /**
     * Check the user's permissions.
     * 
     * @return bool
     */
    public function checkPermissions(): bool
    {

        return current_user_can('manage_options');
    }

    /**
     * Check nonce.
     * 
     * @param $request  Current request.
     * 
     * @return bool
     */
    protected function verifyNonce($request): bool
    {

        $nonce = $request->get_header('X-WP-Nonce');

        return wp_verify_nonce($nonce, $this->nonceAction);
    }

    /**
     * Check the user capability.
     *
     * @param $capability  Type of capability.
     *
     * @return bool
     */
    protected function verifyUserCapability($capability = 'edit_posts'): bool
    {

        return current_user_can($capability);
    }

    /**
     * Validate that a post meta key belongs to this plugin's own namespace.
     *
     * Keys managed by this plugin are prefixed with "_" followed by the
     * plugin's unique string (see MetaBox::setPostMetaKey()). Restricting
     * writes to that namespace prevents endpoints from touching arbitrary or
     * protected WordPress meta keys.
     *
     * @param mixed $metaKey   Raw meta key from the request.
     *
     * @return string|false    The sanitized key, or false if it is not managed
     *                         by this plugin.
     */
    protected function sanitizePluginMetaKey($metaKey)
    {

        if (!is_string($metaKey)) return false;

        $metaKey = sanitize_key(wp_unslash($metaKey));

        $prefix = '_' . MXSFWN_PLUGIN_UNIQUE_STRING;

        if ($metaKey === '' || strpos($metaKey, $prefix) !== 0) return false;

        return $metaKey;
    }

    /**
     * Handle request.
     * 
     * @param $request  Current request.
     * 
     * @return WP_REST_Response
     */
    abstract public function handleRequest($request): WP_REST_Response;
}
