<?php

/**
 * The CreateDataTable class.
 *
 * This class can be used to create
 * a DB table.
 */

namespace MXSFWNWPPGNext\Activate;

class CreateDataTable
{

    /**
     * Table name.
     *
     * @var string
     */
    protected $table;

    /**
     * List of columns.
     *
     * @var array
     */
    protected $columns       = [];

    /**
     * SQL query.
     *
     * @var string
     */
    protected $sqlContainer;

    /**
     * global $wpdb.
     * Is used for DB interactions.
     */
    protected $wpdb;

    /**
     * Datetime Scheme.
     *
     * @var string
     */
    protected $datetime;

    public function __construct(string $tableName)
    {

        global $wpdb;

        $this->datetime = '0000-00-00 00:00:00';

        $this->wpdb     = $wpdb;

        $this->table    = "{$this->wpdb->prefix}{$tableName}";
    }

    /**
     * Create a database column.
     * Creates SQL string for DB column type: varchar
     * 
     * @param string $columnName   Column name.
     * @param int    $length       Column length.
     * @param bool   $notNull      If value can be not NULL.
     * @param string $default      Set default value.
     * 
     * @return object      Return this object to chain in the future.
     */
    public function varchar(string $columnName = 'name', int $length = 10, bool $notNull = false, ?string $default = NULL): object
    {

        $notNull = $notNull ? 'NOT NULL' : 'NULL';

        $default = $default !== NULL ? 'default \'' . $default . '\'' : '';

        $sql     = "$columnName varchar($length) $notNull $default";

        array_push($this->columns, $sql);

        return $this;
    }

    /**
     * Create a database column.
     * Creates SQL string for DB column type: longtext
     * 
     * @param string $columnName   Column name.
     * @param bool   $notNull      If value can be not NULL.
     * 
     * @return object      Return this object to chain in the future.
     */
    public function longText(string $columnName = 'text', bool $notNull = false): object
    {

        $notNull = $notNull ? 'NOT NULL' : 'NULL';

        /**
         * "default" doesn't work for old MySQL versions.
         * */
        // $default = $default !== NULL ? 'default \'' . $default . '\'' : '';

        $sql     = "$columnName longtext $notNull";

        array_push($this->columns, $sql);

        return $this;
    }

    /**
     * Create a database column.
     * Creates SQL string for DB column type: int
     * 
     * @param string $columnName   Column name.
     * 
     * @return object      Return this object to chain in the future.
     */
    public function int(string $columnName = 'integer'): object
    {

        $sql = "$columnName int(11) NOT NULL";

        array_push($this->columns, $sql);

        return $this;
    }

    /**
     * Create a database column.
     * Creates SQL string for DB column type: datetime
     * 
     * @param string $columnName   Column name.
     * @param string $default      Set default value.
     * 
     * @return object      Return this object to chain in the future.
     */
    public function datetime(string $columnName = 'created', ?string $default = NULL): object
    {

        $default = $default == NULL ? $this->datetime : $default;

        $sql     = "$columnName datetime NOT NULL default '$default'";

        array_push($this->columns, $sql);

        return $this;
    }

    /**
     * This function is used after the 
     * columns was set.
     * Creates new table.
     * 
     * @return bool      true/false.
     */
    public function createTable(): bool
    {

        $this->prepareSQL();

        if ($this->sqlContainer === NULL) return false;

        $query = $this->wpdb->prepare("SHOW TABLES LIKE %s", $this->table);

        if ($this->wpdb->get_var($query) != $this->table) {

            // Create a table
            $this->wpdb->query($this->sqlContainer);

            return true;
        }

        return false;
    }

    /**
     * Prepare SQL string for columns
     * set previously.
     * 
     * @param string $id   Name of auto increment column.
     *
     * @return void      Return description.
     */
    protected function prepareSQL(string $id = 'id'): void
    {

        $collate = '';

        if ($this->wpdb->has_cap('collation')) {

            $collate = $this->wpdb->get_charset_collate();
        }

        // Get all columns
        $columns = implode(',', $this->columns);

        if (count($this->columns) === 0) {

            $this->sqlContainer = "CREATE TABLE IF NOT EXISTS `$this->table`
                (
                    `$id` int(11) NOT NULL AUTO_INCREMENT,
                    PRIMARY KEY (`$id`)
                ) $collate;";
        } else {

            $this->sqlContainer = "CREATE TABLE IF NOT EXISTS `$this->table`
                (
                    `$id` int(11) NOT NULL AUTO_INCREMENT,
                    $columns,
                    PRIMARY KEY (`$id`)
                ) $collate;";
        }
    }
}
