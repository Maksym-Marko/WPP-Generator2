<?php

/**
 * The PathNotice class.
 *
 * This class is used for user notification
 * in case the controller file doesn't exists.
 */

namespace MXSFWNWPPGNext\Admin\Utilities\Notices;

use MXSFWNWPPGNext\Admin\Entities\AdminNotices;

class PathNotice extends AdminNotices
{

    public static function throw($path)
    {

        $instance = new static('error');

        $instance->addMessage("File \"{$path}\" DOES NOT exists")->display();
    }
}
