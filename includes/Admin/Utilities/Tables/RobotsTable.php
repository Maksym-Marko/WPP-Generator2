<?php

/**
 * The RobotsTable class.
 *
 * This class extends WP_List_Table::class
 * Here is an example of how to create
 * a custom table using WordPress engine.
 */

namespace MXSFWNWPPGNext\Admin\Utilities\Tables;

use WP_List_Table;
use wpdb;

class RobotsTable extends WP_List_Table
{

    /**
	 * The unique string.
	 *
	 * @var string
	 */
    protected $uniqueString   = MXSFWN_PLUGIN_UNIQUE_STRING;

    /**
	 * The name of DB table.
	 *
	 * @var string
	 */
    protected $table;

    /**
	 * Page slug is used to display the table.
     * 
     * If you wish to change this slug, please
     * do the same for the router:
     * \includes\Admin\routes.php
	 *
	 * @var string
	 */
    protected $mainMenuSlug    = 'ai-robots';

    /**
	 * Page slug is used to display a single item.
     * 
     * If you wish to change this slug, please
     * do the same for the router:
     * \includes\Admin\routes.php
	 *
	 * @var string
	 */
    protected $singleMenuSlug  = 'ai-robot-edit';

    /**
	 * Slug is used to catch actions:
     * trash, restore, delete.
     * 
     * If you wish to change this slug, please
     * do the same for the router:
     * \includes\Admin\routes.php
	 *
	 * @var string
	 */
    protected $actionsMenuSlug = 'action-ai-robot-trash-restore-delete';

    /**
	 * Number of items per page in the table.
	 *
	 * @var int
	 */
    protected $perPage         = 20;

    /**
	 * Search SQL.
	 *
	 * @var string
	 */
    protected $searchSQL       = '';

    /**
	 * Constructor.
     * 
	 * @param array|string $args {
	 *     Array or string of arguments.
	 *
	 *     @type string $plural   Plural value used for labels and the objects being listed.
	 *                            This affects things such as CSS class-names and nonces used
	 *                            in the list table, e.g. 'posts'. Default empty.
	 *     @type string $singular Singular label for an object being listed, e.g. 'post'.
	 *                            Default empty
	 *     @type bool   $ajax     Whether the list table supports Ajax. This includes loading
	 *                            and sorting data, for example. If true, the class will call
	 *                            the _js_vars() method in the footer to provide variables
	 *                            to any scripts handling Ajax events. Default false.
	 *     @type string $screen   String containing the hook name used to determine the current
	 *                            screen. If left null, the current screen will be automatically set.
	 *                            Default null.
	 * }
	 */
    public function __construct($args = [])
    {

        parent::__construct(
            [
                'singular' => "{$this->uniqueString}_singular",
                'plural'   => "{$this->uniqueString}_plural",
            ]
        );

        $this->table = "{$this->wpdb()->prefix}ai_robots";
    }

    /**
	 * global $wpdb is used for DB interaction.
	 *
	 * @var class wpdb
	 */
    protected function wpdb(): wpdb
    {

        return $GLOBALS['wpdb'];
    }

    /**
     * Prepare data before display.
     * This function checks $_GET and prepare
     * data according to user's wishes.
     * 
     * @return void      Maintenance table.
     */
    public function prepare_items(): void
    {

        $currentPage = $this->get_pagenum();

        $offset = 1 < $currentPage ? ($this->perPage * ($currentPage - 1)) : 0;

        // Sort direction — map to a fixed, supported value.
        $order = 'DESC';

        if (isset($_GET['order']) && is_string($_GET['order']) && strtoupper(sanitize_text_field(wp_unslash($_GET['order']))) === 'ASC') {

            $order = 'ASC';
        }

        // Sort column — map the request to an allowed, real column name.
        $allowedOrderBy = ['id', 'title', 'status', 'created_at'];

        $orderBy = 'id';

        if (isset($_GET['orderby']) && is_string($_GET['orderby'])) {

            $requestedOrderBy = sanitize_key(wp_unslash($_GET['orderby']));

            if (in_array($requestedOrderBy, $allowedOrderBy, true)) {

                $orderBy = $requestedOrderBy;
            }
        }

        // Search — bind the user value inside a prepared LIKE fragment.
        if (!empty($_REQUEST['s']) && is_string($_REQUEST['s'])) {

            $like = '%' . $this->wpdb()->esc_like(sanitize_text_field(wp_unslash($_REQUEST['s']))) . '%';

            $this->searchSQL = $this->wpdb()->prepare(' AND title LIKE %s', $like);
        }

        // Status — whitelisted and bound.
        $itemStatus = $this->currentItemStatus();

        $status = $this->wpdb()->prepare(' AND status = %s', $itemStatus);

        // Get data
        $items = $this->wpdb()->get_results(
            "SELECT * FROM {$this->table} WHERE 1 = 1{$status}{$this->searchSQL} " .
                $this->wpdb()->prepare("ORDER BY {$orderBy} {$order} LIMIT %d OFFSET %d;", $this->perPage, $offset),
            ARRAY_A
        );

        // Set data
        $this->items = $items;

        // Set column headers
        $columns  = $this->get_columns();

        $hidden   = $this->get_hidden_columns();

        $sortable = $this->get_sortable_columns();

        $this->_column_headers = [
            $columns,
            $hidden,
            $sortable,
        ];

        // Set the pagination
        $count = (int) $this->wpdb()->get_var("SELECT COUNT(id) FROM {$this->table} WHERE 1 = 1{$status}{$this->searchSQL};");

        $this->set_pagination_args(
            [
                'total_items' => $count,
                'per_page'    => $this->perPage,
                'total_pages' => ceil($count / $this->perPage),
            ]
        );
    }

    /**
     * Return the current, whitelisted item status from the request.
     * Safely handles missing, invalid and array inputs.
     *
     * @return string      'publish' (default) or 'trash'.
     */
    protected function currentItemStatus(): string
    {

        $allowed = ['publish', 'trash'];

        if (isset($_GET['item-status']) && is_string($_GET['item-status'])) {

            $status = sanitize_key(wp_unslash($_GET['item-status']));

            if (in_array($status, $allowed, true)) {

                return $status;
            }
        }

        return 'publish';
    }

    /**
     * This function collect array 
     * of columns used in the table.
     * 
     * @return array      List of columns.
     */
    public function get_columns(): array
    {

        return [
            'cb'          => '<input type="checkbox" />',
            'id'          => __('ID', 'wpp-generator-next'),
            'title'       => __('Title', 'wpp-generator-next'),
            'description' => __('Description', 'wpp-generator-next'),
            'status'      => __('Status', 'wpp-generator-next'),
            'created_at'  => __('Created', 'wpp-generator-next'),
        ];
    }

    /**
     * Here you can hide some columns
     * from the table.
     * 
     * @return array      List of hidden columns.
     */
    public function get_hidden_columns(): array
    {

        return [
            'id',
            'status',
        ];
    }

    /**
     * Here you can register sortable columns.
     * 
     * @return array      List of sortable columns.
     */
    public function get_sortable_columns(): array
    {

        return [
            'title' => [
                'title',
                false,
            ]
        ];
    }

    /**
     * Function "column_{$columnName}"
     * displays a data for particular column.
     * In this case: cb
     * 
     * @return void      Return data according current column.
     */
    public function column_cb($item): void
    {

        printf(
            '<input type="checkbox" class="%1$s_bulk_input" name="%1$s-robot-ids[]" value="%2$d" />',
            $this->uniqueString,
            $item['id']
        );
    }

    /**
     * Function "column_{$columnName}"
     * displays a data for particular column.
     * In this case: id
     * 
     * @return void      Return data according current column.
     */
    public function column_id($item): void
    {

        echo esc_html($item['id']);
    }

    /**
     * Function "column_{$columnName}"
     * displays a data for particular column.
     * In this case: title
     * 
     * @return void      Return data according current column.
     */
    public function column_title($item): void
    {

        $singleRobotUrl      = admin_url("admin.php?page={$this->singleMenuSlug}");
        $robotsActionsUrl    = admin_url("admin.php?page={$this->actionsMenuSlug}");

        $user_id  = get_current_user_id();

        $can_edit = current_user_can('edit_user', $user_id);

        $actions = [];

        $output   = '<strong>';

        if ($can_edit) {

            $output .= sprintf(
                '<a href="%s&edit-item=%d">%s</a>',
                esc_url($singleRobotUrl),
                absint($item['id']),
                esc_html($item['title'])
            );

            $actionUrl = function ($action) use ($robotsActionsUrl, $item) {

                return esc_url(wp_nonce_url(add_query_arg(
                    [$action => $item['id']],
                    $robotsActionsUrl
                ), $action, "{$this->uniqueString}_nonce"));
            };

            if ($this->currentItemStatus() === 'trash') {

                $actions['restore'] = sprintf(
                    '<a aria-label="%s" href="%s">%s</a>',
                    esc_attr__('Restore', 'wpp-generator-next'),
                    $actionUrl('restore'),
                    esc_html__('Restore', 'wpp-generator-next')
                );

                $actions['delete'] = sprintf(
                    '<a class="submitDelete" aria-label="%s" href="%s">%s</a>',
                    esc_attr__('Delete Permanently', 'wpp-generator-next'),
                    $actionUrl('delete'),
                    esc_html__('Delete Permanently', 'wpp-generator-next')
                );
            } else {

                $actions['edit'] = sprintf(
                    '<a href="%s&edit-item=%d">%s</a>',
                    esc_url($singleRobotUrl),
                    $item['id'],
                    __('Edit', 'wpp-generator-next')
                );

                $actions['trash'] = sprintf(
                    '<a class="submitDelete" aria-label="%s" href="%s">%s</a>',
                    esc_attr__('Trash', 'wpp-generator-next'),
                    $actionUrl('trash'),
                    esc_html__('Trash', 'wpp-generator-next')
                );
            }

            $rowActions = [];

            foreach ($actions as $action => $link) {

                $rowActions[] = sprintf(
                    '<span class="%s">%s</span>',
                    esc_attr($action),
                    $link
                );
            }

            $output .= sprintf(
                '<div class="row-actions">%s</div>',
                implode(' | ', $rowActions)
            );
        } else {

            $output .= esc_html($item['title']);
        }

        $output .= '</strong>';

        echo $output;
    }

    /**
     * Function "column_{$columnName}"
     * displays a data for particular column.
     * In this case: description
     * 
     * @return void      Return data according current column.
     */
    public function column_description($item): void
    {

        $length = 30;

        $description = strlen($item['description']) <= $length ? $item['description'] : substr($item['description'], 0, $length) . '...';

        echo esc_html($description);
    }

    /**
     * Function "column_{$columnName}"
     * displays a data for particular column.
     * In this case: created_at
     * 
     * @return void      Return data according current column.
     */
    public function column_created_at($item): void
    {

        echo esc_html($item['created_at']);
    }

    /**
     * Here you can register bulk actions.
     * Eg. trash, restore, delete.
     * 
     * @return array      List of bulk actions.
     */
    protected function get_bulk_actions(): array
    {

        $action = [];

        if (!current_user_can('edit_posts')) return $action;

        if ($this->currentItemStatus() === 'trash') {

            $action['restore'] = __('Restore Items', 'wpp-generator-next');
            $action['delete']  = __('Delete Permanently', 'wpp-generator-next');
        } else {

            $action['trash']   = __('Move to trash', 'wpp-generator-next');
        }

        return $action;
    }

    /**
     * This function generates HTML markup
     * of the search box. You can find
     * table items using the box.
     * 
     * @return void      Return search box above the table.
     */
    public function search_box($text, $inputId): void
    {

        if (empty($_REQUEST['s']) && !$this->has_items()) return; ?>

        <p class="search-box">
            <label class="screen-reader-text" for="<?php esc_attr_e($inputId); ?>">
                <?php esc_html_e($text); ?>:
            </label>
            <input type="search" id="<?php esc_attr_e($inputId); ?>" name="s" value="<?php _admin_search_query(); ?>" />
            <?php submit_button(esc_html($text), '', '', false, [
                'id' => "{$this->uniqueString}-search-submit"
            ]); ?>
        </p>
<?php
    }

    /**
     * If the search fails,
     * here you can register text 
     * for different views.
     * 
     * @return void      Not found message.
     */
    public function no_items(): void
    {

        if ($this->currentItemStatus() === 'trash') {

            esc_html_e('No items found in trash.', 'wpp-generator-next');
        } else {

            esc_html_e('No items found.', 'wpp-generator-next');
        }
    }

    /**
     * Here you can add links for different
     * types of data display. Eg. publish or trash.
     * 
     * @return array      List of links.
     */
    protected function get_views(): array
    {

        $itemStatus    = $this->currentItemStatus();
        $publishNumber = $this->wpdb()->get_var("SELECT COUNT(id) FROM {$this->table} WHERE status='publish';");
        $trashNumber   = $this->wpdb()->get_var("SELECT COUNT(id) FROM {$this->table} WHERE status='trash';");
        $url           = admin_url("admin.php?page={$this->mainMenuSlug}");

        $statusLinks   = [];

        // Publish
        if ($publishNumber > 0) {

            $statusLinks['publish'] = [
                'url'     => add_query_arg('item-status', 'publish', $url),
                'label'   => sprintf(
                    _nx(
                        'Publish <span class="count">(%s)</span>',
                        'Publish <span class="count">(%s)</span>',
                        $publishNumber,
                        'publish'
                    ),
                    number_format_i18n($publishNumber)
                ),
                'current' => 'publish' === $itemStatus,
            ];
        }

        // Trash
        if ($trashNumber > 0) {

            $statusLinks['trash'] = [
                'url'     => add_query_arg('item-status', 'trash', $url),
                'label'   => sprintf(
                    _nx(
                        'Trash <span class="count">(%s)</span>',
                        'Trash <span class="count">(%s)</span>',
                        $trashNumber,
                        'trash'
                    ),
                    number_format_i18n($trashNumber)
                ),
                'current' => 'trash' == $itemStatus,
            ];
        }

        return $this->get_views_links($statusLinks);
    }
}
