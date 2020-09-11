<?php
/**
 * Imager Configuration
 *
 */

return [
    // Global settings
    '*' => [
        'transformer' => 'craft',
        'imagerSystemPath' => '@webroot/assets/imager/',
        'imagerUrl' => getenv('CLOUDFRONT_URL') . '/transforms/' ,
        'cacheEnabled' => true,
        'cacheRemoteFiles' => true,
        'cacheDuration' => 1209600, // 14 days
        'cacheDurationRemoteFiles' => 1209600, // 14 days
        'cacheDurationExternalStorage' => 1209600, // 14 days
        'cacheDurationNonOptimized' => 300,
        'jpegQuality' => 80,
        'pngCompressionLevel' => 2,
        'webpQuality' => 80,
        'webpImagickOptions' => [], // additional options you want to pass to Imagick via '$instance->setOption('webp:option', 'value')'.
        'useCwebp' => true,
        'cwebpPath' => '/usr/bin/cwebp',
        'cwebpOptions' => '', // additional options you want to pass to cwebp. Quality is set automatically.
        'interlace' => false, // false, true ('line'), 'none', 'line', 'plane', 'partition'
        'allowUpscale' => true,
        'resizeFilter' => 'lanczos',
        'smartResizeEnabled' => false,
        'removeMetadata' => true,
        'bgColor' => '',
        'position' => '50% 50%',
        'letterbox' => ['color'=>'#000', 'opacity'=>0],
        'useFilenamePattern' => true,
        'filenamePattern' => '{basename}_{transformString|hash}.{extension}',
        'shortHashLength' => 10,
        'hashPath' => false,
        'addVolumeToPath' => true,
        'hashRemoteUrl' => false, // true, false, or 'host' (meaning only the host part of the url is hashed)
        'useRemoteUrlQueryString' => false,
        'instanceReuseEnabled' => false,
        'noop' => false,
        'suppressExceptions' => true,
        'convertToRGB' => false, // Should images be converted to RGB?
        'skipExecutableExistCheck' => false,
        'curlOptions' => [],
        'runTasksImmediatelyOnAjaxRequests' => true,
        'fillTransforms' => false,
        'fillAttribute' => 'width', // this could be any attribute that is numeric
        'fillInterval' => '200',
        'clearKey' => '', // Key that should be passed to the clear controller action. Empty string means clearing is disabled.
        'useForNativeTransforms' => true,
        'useForCpThumbs' => false,
        'optimizeType' => 'job',
        'optimizers' => ['jpegoptim','optipng','gifsicle'],

        'optimizerConfig' => [
            'jpegoptim' => [
                'extensions' => ['jpg'],
                'path' => '/usr/bin/jpegoptim',
                'optionString' => '-s',
            ],
            'jpegtran' => [
                'extensions' => ['jpg'],
                'path' => '/usr/bin/jpegtran',
                'optionString' => '-optimize -copy none',
            ],
            'mozjpeg' => [
                'extensions' => ['jpg'],
                'path' => '/usr/bin/mozjpeg',
                'optionString' => '-optimize -copy none',
            ],
            'optipng' => [
                'extensions' => ['png'],
                'path' => '/usr/bin/optipng',
                'optionString' => '-o2',
            ],
            'pngquant' => [
                'extensions' => ['png'],
                'path' => '/usr/bin/pngquant',
                'optionString' => '--strip --skip-if-larger',
            ],
            'gifsicle' => [
                'extensions' => ['gif'],
                'path' => '/usr/bin/gifsicle',
                'optionString' => '--optimize=3 --colors 256',
            ],
            'tinypng' => [
                'extensions' => ['png','jpg'],
                'apiKey' => '',
            ],
            'kraken' => [
                'extensions' => ['png', 'jpg', 'gif'],
                'apiKey' => '',
                'apiSecret' => '',
                'additionalParams' => [
                    'lossy' => true,
                ]
            ],
            'imageoptim' => [
                'extensions' => ['png', 'jpg', 'gif'],
                'apiUsername' => '',
                'quality' => 'medium'
            ],
        ],

        'storages' => ['aws'],
        'storageConfig' => [
            'aws' => [
                'accessKey' => getenv('S3_KEY_ID'),
                'secretAccessKey' => getenv('S3_SECRET'),
                'region' => getenv('S3_REGION'),
                'bucket' => getenv('S3_BUCKET'),
                'folder' => 'transforms',
                'requestHeaders' => array(),
                'storageType' => 'standard',
                'public' => false,
                'cloudfrontInvalidateEnabled' => false,
                'cloudfrontDistributionId' => getenv('CLOUDFRONT_DISTRIBUTION_ID'),
            ]
        ]
    ],

    // Dev environment settings
    'dev' => [
        'suppressExceptions' => false,
        'cwebpPath' => '/usr/local/bin/cwebp',
        'optimizerConfig' => [
            'jpegoptim' => [
                'extensions' => ['jpg'],
                'path' => '/usr/local/bin/jpegoptim',
                'optionString' => '-s',
            ],
            'jpegtran' => [
                'extensions' => ['jpg'],
                'path' => '/usr/local/bin/jpegtran',
                'optionString' => '-optimize -copy none',
            ],
            'mozjpeg' => [
                'extensions' => ['jpg'],
                'path' => '/usr/local/bin/mozjpeg',
                'optionString' => '-optimize -copy none',
            ],
            'optipng' => [
                'extensions' => ['png'],
                'path' => '/usr/local/bin/optipng',
                'optionString' => '-o2',
            ],
            'pngquant' => [
                'extensions' => ['png'],
                'path' => '/usr/local/bin/pngquant',
                'optionString' => '--strip --skip-if-larger',
            ],
            'gifsicle' => [
                'extensions' => ['gif'],
                'path' => '/usr/local/bin/gifsicle',
                'optionString' => '--optimize=3 --colors 256',
            ],
            'tinypng' => [
                'extensions' => ['png','jpg'],
                'apiKey' => '',
            ],
            'kraken' => [
                'extensions' => ['png', 'jpg', 'gif'],
                'apiKey' => '',
                'apiSecret' => '',
                'additionalParams' => [
                    'lossy' => true,
                ]
            ],
            'imageoptim' => [
                'extensions' => ['png', 'jpg', 'gif'],
                'apiUsername' => '',
                'quality' => 'medium'
            ],
        ],
    ],

    // Staging environment settings
    'staging' => [

    ],

    // Production environment settings
    'production' => [

    ],

];
