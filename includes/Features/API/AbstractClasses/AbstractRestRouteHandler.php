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
    protected $nonceAction;

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

        if (!wp_verify_nonce($nonce, $this->nonceAction)) false;

        return true;
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

        if (!current_user_can($capability)) false;

        return true;
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
