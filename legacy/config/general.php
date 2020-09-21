<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

$baseUrl = getenv('BASE_URL') ?: null;
$fileSystemPath = getenv('FILE_SYSTEM_PATH') ?: $_SERVER['DOCUMENT_ROOT'];

return [
    // Global settings
    '*' => [
        'defaultWeekStartDay' => 1,
        'enableCsrfProtection' => true,
        'omitScriptNameInUrls' => true,
        'useProjectConfigFile' => true,
        'allowUpdates' => true,
        'allowAdminChanges' => true,
        'enableTemplateCaching' => true,
        'errorTemplatePrefix' => '_errors/',
        'isSystemLive' => true,
        'timezone' => 'America/New_York',
        'cpTrigger' => getenv('CP_TRIGGER') ?: 'admin',
        'securityKey' => getenv('SECURITY_KEY'),
        'resourceBasePath' => dirname(__DIR__) . '/web/cpresources',
        'siteUrl' => $baseUrl,
        'aliases' => [
            '@sitePath' => $fileSystemPath,
            '@siteUrl'  => $baseUrl,
            '@assetPath' => $fileSystemPath . DIRECTORY_SEPARATOR . 'web/assets',
            '@assetUrl'  => $baseUrl . '/assets/',
        ],
    ],

    // Dev environment settings
    'dev' => [
        'devMode' => true,
        'enableTemplateCaching' => false,
        'allowUpdates' => true,
        'allowAdminChanges' => true,
    ],

    // Staging environment settings
    'staging' => [
        'devMode' => false,
        'allowUpdates' => false,
        'allowAdminChanges' => false,
    ],

    // Production environment settings
    'production' => [
        'devMode' => false,
        'allowUpdates' => false,
        'allowAdminChanges' => false,
    ],
];
