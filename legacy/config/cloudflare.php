<?php
// config/cloudflare.php
return [
    'authType' => 'key',
    'apiKey' => getenv('CLOUDFLARE_API_KEY'),
    'zone' => getenv('CLOUDFLARE_ZONE'),
    'email' => getenv('CLOUDFLARE_EMAIL'),
    'purgeEntryUrls' => getenv('CLOUDFLARE_PURGE_ENTRY_URLS', false),
    'purgeAssetUrls' => getenv('CLOUDFLARE_PURGE_ASSET_URLS', false),
];
