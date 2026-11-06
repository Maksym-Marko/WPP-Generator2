<?php

/**
 * The DeletePostMetaImageRoute class.
 *
 * This class registers an endpoint 
 * for removing an image post meta.
 */

namespace MXSFWNWPPGNext\Features\API\Routes;

use MXSFWNWPPGNext\Features\API\AbstractClasses\AbstractRestRouteHandler;
use WP_REST_Response;
use WP_Post;

class DeletePostMetaImageRoute extends AbstractRestRouteHandler
{

    protected $route = '/post-id/(?P<postId>[\d]+)/delete/';
    
    protected $nonceAction = 'wp_rest';

    public function handleRequest($request): WP_REST_Response
    {

        $nonceCheck = $this->verifyNonce($request);

        if ($nonceCheck !== true) {

            return new WP_REST_Response([
                'error' => 'Invalid Nonce.'
            ], 401);
        }

        $postId = (int) $request->get_param('postId');
        $post = get_post($postId);

        if (!($post instanceof WP_Post)) {

            return new WP_REST_Response([
                'message' => 'Post does not exist.'
            ], 404);
        }

        if (!current_user_can('edit_post', $postId)) {

            return new WP_REST_Response([
                'error' => 'Invalid CapabilityCheck.'
            ], 401);
        }

        $attributes = $request->get_param('attributes');

        if (!$attributes) {

            return new WP_REST_Response([
                'message' => 'No Attributes set!'
            ], 404);
        }

        if (!isset($attributes['postMetaKey'])) {

            return new WP_REST_Response([
                'message' => 'No post meta key selected!'
            ], 404);
        }

        $postMetaKey = $this->sanitizePluginMetaKey($attributes['postMetaKey']);

        if ($postMetaKey === false) {

            return new WP_REST_Response([
                'message' => 'Invalid post meta key.'
            ], 403);
        }

        update_post_meta($postId, $postMetaKey, '');

        return new WP_REST_Response([
            'status'   => 'success',
            'message'  => "Current post id: $postId",
            'postId'   => $postId,
        ], 200);
    }
}
