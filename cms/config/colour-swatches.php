<?php
/**
 * color-swatches plugin for Craft CMS 3.x.
 *
 * Let clients choose from a predefined set of colours.
 *
<<<<<<< HEAD
 * @link      https://hybridinteractive.io
 *
 * @copyright Copyright (c) 2020 Hybrid Interactive
=======
 * @link      https://percipio.london
 *
 * @copyright Copyright (c) 2020 Percipio Global Ltd.
>>>>>>> 42cadec7485014caa5b6b3c18b2dffba83423f72
 */

/**
 * color-swatches config.php.
 *
 * This file exists only as a template for the color-swatches settings.
 * It does nothing on its own.
 *
 * Don't edit this file, instead copy it to 'craft/config' as 'color-swatches.php'
 * and make your changes there to override default settings.
 *
 * Once copied to 'craft/config', this file will be multi-environment aware as
 * well, so you can have different settings groups for each environment, just as
 * you do for 'general.php'
 */

return [

    'palettes' => [
        'headers' => [],

        'Default' => [

            [
                'label'   => 'primary',
                'default' => true,
                'color'   =>  [
                    [
                        'color'   => '#2348CC',
                        'class' => 'primary',
                    ],
                ] 
            ],
            [
                'label'   => 'secondary',
                'default' => false,
                'color'   =>  [
                    [
                        'color'   => '#F42F4C',
                        'class' => 'secondary',
                    ],
                ] 
            ],
            [
                'label'   => 'tertiary',
                'default' => false,
                'color'   =>  [
                    [
                        'color'   => '#122466',
                        'class' => 'tertiary',
                    ],
                ] 
            ],
            [
                'label'   => 'quaternary',
                'default' => false,
                'color'   =>  [
                    [
                        'color'   => '#210F3C',
                        'class' => 'quaternary',
                    ],
                ] 
            ],
            [
                'label'   => 'grey',
                'default' => false,
                'color'   =>  [
                    [
                        'color'   => '#F4F4F4',
                        'class' => 'grey',
                    ],
                ] 
            ],
        ],
    ],
];