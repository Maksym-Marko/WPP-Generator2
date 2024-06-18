<?php

namespace MXSFWNWPPGNext\Admin\Utilities;

use MXSFWNWPPGNext\Core\CustomPostType;

class CPTGenerator extends CustomPostType
{

    public static function create(string $postType, array $label, array $properties)
    {

        $instance = new static($postType);

        $instance->labels($label);

        $instance->properties($properties);

        $instance->register();
    }
    
}
