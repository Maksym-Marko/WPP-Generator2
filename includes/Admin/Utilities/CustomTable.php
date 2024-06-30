<?php

namespace MXSFWNWPPGNext\Admin\Utilities;

// if (!class_exists('WP_List_Table')) {
//     require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
// }

use WP_List_Table;

class CustomTable extends WP_List_Table
{

    protected $uniqueString = MXSFWN_PLUGIN_UNIQUE_STRING;

    public function __construct($args = [])
    {

        parent::__construct(
            [
                'singular' => "{$this->uniqueString}_singular",
                'plural'   => "{$this->uniqueString}_plural",
            ]
        );
    }

    public function prepare_items()
    {

        global $wpdb;

        // Pagination.
        $perPage     = 20;
        $currentPage = $this->get_pagenum();

        if (1 < $currentPage) {
            $offset = $perPage * ($currentPage - 1);
        } else {
            $offset = 0;
        }

        // Sortable.
        $order = isset($_GET['order']) ? trim(sanitize_text_field($_GET['order'])) : 'desc';
        $orderBy = isset($_GET['orderby']) ? trim(sanitize_text_field($_GET['orderby'])) : 'id';

        // Search.
        $search = '';

        if (!empty($_REQUEST['s'])) {
            $search = "AND title LIKE '%" . esc_sql($wpdb->esc_like(sanitize_text_field(wp_unslash($_REQUEST['s'])))) . "%' ";
        }

        // Status.
        $itemStatus = isset($_GET['item_status']) ? trim($_GET['item_status']) : 'publish';
        $status = "AND status = '$itemStatus'";

        // Get data.
        $tableName = $wpdb->prefix . 'MXSFW_TABLE_SLUG';

        $items = $wpdb->get_results(
            "SELECT * FROM {$tableName} WHERE 1 = 1 {$status} {$search}" .
                $wpdb->prepare("ORDER BY {$orderBy} {$order} LIMIT %d OFFSET %d;", $perPage, $offset),
            ARRAY_A
        );

        $count = $wpdb->get_var("SELECT COUNT(id) FROM {$tableName} WHERE 1 = 1 {$status} {$search};");

        // Set data.
        $this->items = $items;

        // Set column headers.
        $columns  = $this->get_columns();
        $hidden   = $this->get_hidden_columns();
        $sortable = $this->get_sortable_columns();

        $this->_column_headers = [
            $columns,
            $hidden,
            $sortable,
        ];

        // Set the pagination.
        $this->set_pagination_args(
            [
                'total_items' => $count,
                'per_page'    => $perPage,
                'total_pages' => ceil($count / $perPage),
            ]
        );
    }

    public function get_columns()
    {

        return [
            'cb'          => '<input type="checkbox" />',
            'id'          => __( 'ID', 'stuff-for-wpp2' ),
            'title'       => __( 'Title', 'stuff-for-wpp2' ),
            'description' => __( 'Description', 'stuff-for-wpp2' ),
            'status'      => __( 'Status', 'stuff-for-wpp2' ),
            'created_at'  => __( 'Created', 'stuff-for-wpp2' ),
        ];
    }

    public function get_hidden_columns()
    {

        return [
            'id',
            'status',
        ];
    }

    public function get_sortable_columns()
    {

        return [
            'title' => [
                'title',
                false,
            ]
        ];
    }

    public function column_default( $item, $columnName )
    {

        do_action( "manage_{$this->uniqueString}_items_custom_column", $columnName, $item );
    }

    public function column_cb( $item )
    {
        // {$this->uniqueString}

        printf( '<input type="checkbox" class="mxsfw_bulk_input" name="mxsfw-action-%1$s" value="%1$s" />', $item['id'] );
    }

    public function column_id( $item )
    {

        echo $item['id'];
    }

    public function column_title( $item )
    {

        $url      = admin_url( 'admin.php?page=' . 'MXSFW_SINGLE_TABLE_ITEM_MENU' );

        $user_id  = get_current_user_id();

        $can_edit = current_user_can( 'edit_user', $user_id );

        $output   = '<strong>';

        if ($can_edit) {

            $output .= '<a href="' . esc_url( $url ) . '&edit-item=' . $item['id'] . '">' . $item['title'] . '</a>';

            $actions['edit']  = '<a href="' . esc_url( $url ) . '&edit-item=' . $item['id'] . '">' . __( 'Edit', 'stuff-for-wpp2' ) . '</a>';
            $actions['trash'] = '<a class="submitdelete" aria-label="' . esc_attr__( 'Trash', 'stuff-for-wpp2' ) . '" href="' . esc_url(
                wp_nonce_url(
                    add_query_arg(
                        [
                            'trash' => $item['id'],
                        ],
                        $url
                    ),
                    'trash',
                    "{$this->uniqueString}_nonce"
                )
            ) . '">' . esc_html__( 'Trash', 'stuff-for-wpp2' ) . '</a>';

            $itemStatus = isset( $_GET['item_status'] ) ? trim( $_GET['item_status'] ) : 'publish';

            if ($itemStatus == 'trash') {

                unset( $actions['edit'] );
                unset( $actions['trash'] );

                $actions['restore'] = '<a aria-label="' . esc_attr__( 'Restore', 'stuff-for-wpp2' ) . '" href="' . esc_url(
                    wp_nonce_url(
                        add_query_arg(
                            [
                                'restore' => $item['id'],
                            ],
                            $url
                        ),
                        'restore',
                        "{$this->uniqueString}_nonce"
                    )
                ) . '">' . esc_html__( 'Restore', 'stuff-for-wpp2' ) . '</a>';

                $actions['delete'] = '<a class="submitdelete" aria-label="' . esc_attr__( 'Delete Permanently', 'stuff-for-wpp2' ) . '" href="' . esc_url(
                    wp_nonce_url(
                        add_query_arg(
                            [
                                'delete' => $item['id'],
                            ],
                            $url
                        ),
                        'delete',
                        "{$this->uniqueString}_nonce"
                    )
                ) . '">' . esc_html__( 'Delete Permanently', 'stuff-for-wpp2' ) . '</a>';

            }
    
            $rowActions = [];
    
            foreach ($actions as $action => $link) {
                $rowActions[] = '<span class="' . esc_attr( $action ) . '">' . $link . '</span>';
            }
    
            $output .= '<div class="row-actions">' . implode( ' | ', $rowActions ) . '</div>';
                
        } else {

            $output .= $item['title'];

        }

        $output .= '</strong>';

        echo $output;
    }

    public function column_description( $item )
    {

        $length = 30;

        echo strlen( $item['description'] ) <= $length ? $item['description'] : substr( $item['description'], 0, $length ) . '...';
    }

    public function column_created_at( $item )
    {

        echo $item['created_at'];
    }

    protected function get_bulk_actions()
    {

        if (!current_user_can('edit_posts')) {
            return [];
        }

        $itemStatus = isset( $_GET['item_status'] ) ? trim( $_GET['item_status'] ) : 'publish';

        $action = [
            'trash' => __( 'Move to trash', 'stuff-for-wpp2' ),
        ];

        if ($itemStatus == 'trash') {

            unset( $action['trash'] );

            $action['restore'] = __( 'Restore Item', 'stuff-for-wpp2' );
            $action['delete']  = __( 'Delete Permanently', 'stuff-for-wpp2' );

        }

        return $action;
    }

    public function search_box( $text, $inputId )
    {

        if (empty($_REQUEST['s']) && ! $this->has_items()) {
            return;
        }

        ?>
            <p class="search-box">
                <label class="screen-reader-text" for="<?php echo esc_attr( $inputId ); ?>"><?php echo $text; ?>:</label>
                <input type="search" id="<?php echo esc_attr( $inputId ); ?>" name="s" value="<?php _admin_search_query(); ?>" />
                    <?php submit_button( $text, '', '', false, ['id' => 'mxsfw-search-submit'] ); ?>
            </p>
        <?php

    }

    protected function get_views()
    {

        global $wpdb;

        $tableName     = $wpdb->prefix . MXSFW_TABLE_SLUG;
        $itemStatus    = isset( $_GET['item_status'] ) ? trim( $_GET['item_status'] ) : 'publish';
        $publishNumber = $wpdb->get_var( "SELECT COUNT(id) FROM {$tableName} WHERE status='publish';" );
        $trashNumber   = $wpdb->get_var( "SELECT COUNT(id) FROM {$tableName} WHERE status='trash';" );
        $url           = admin_url( 'admin.php?page=' . MXSFW_MAIN_MENU_SLUG );

        $statusLinks   = [];

        // Publish.
        $statusLinks['publish'] = [
            'url'     => add_query_arg( 'item_status', 'publish', $url ),
            'label'   => sprintf(
                _nx(
                    'Publish <span class="count">(%s)</span>',
                    'Publish <span class="count">(%s)</span>',
                    $publishNumber,
                    'publish'
                ),
                number_format_i18n( $publishNumber )
            ),
            'current' => 'publish' == $itemStatus,
        ];

        if ($publishNumber == 0) {
            unset( $statusLinks['publish'] );
        }

        // Trash.
        $statusLinks['trash'] = [
            'url'     => add_query_arg( 'item_status', 'trash', $url ),
            'label'   => sprintf(
                _nx(
                    'Trash <span class="count">(%s)</span>',
                    'Trash <span class="count">(%s)</span>',
                    $trashNumber,
                    'trash'
                ),
                number_format_i18n( $trashNumber )
            ),
            'current' => 'trash' == $itemStatus,
        ];

        if ($trashNumber == 0) {
            unset( $statusLinks['trash'] );
        }

        return $this->get_views_links( $statusLinks );
    }

    public function no_items()
    {

        $itemStatus = isset( $_GET['item_status'] ) ? trim( $_GET['item_status'] ) : 'publish';
        
        if ($itemStatus == 'trash') {

            _e( 'No items found in trash.' );
        } else {

            _e( 'No items found.' );
        }
    }
}
