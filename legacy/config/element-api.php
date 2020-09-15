<?php

use craft\elements\Entry;
use craft\elements\Asset;
use craft\elements\Category;
use craft\helpers\UrlHelper;

/////////////////////////////////////////////////////////////////////////
//
// API Endpoints
// all endpoints start at api/
// Endpoints:
// blog.json (handle: blogEntries),
// campaign.json (handle: campaignEntries),
// pages.json (handle: pages),
// news.json (handle: newsEntries),
// learn-circle.json (handle: educateYourselfEntries type:circleGrid),
// learn-detail.json (handle: educateYourselfEntries type:detail),
// resource-center.json (handle: resourceCenter)
//
/////////////////////////////////////////////////////////////////////////

return [
    'endpoints' => [
        'api/blog.json' => function() { return [
            'elementType' => Entry::class,
            'elementsPerPage' => 100,
            'pageParam' => 'pg',
            'criteria' => [
                'section' => 'blogEntries',
                'limit' => null,
            ],

            'transformer' => function(Entry $entry) {
                // Fields: Image(image ASSET), Body(body REDACTOR), Content Block(contentBlock MATRIX), Blog Categories(blogCategories CATEGORIES), Element Metadata(seoElementMetadata METADATA), Tracking Pixel Code (trackingPixelCode TEXT)

                // Image(image ASSET)
                $image = [];
                if (isset($entry->image[0])) {
                    $image=[
                        'image' => $entry->image[0]->url,
                        'photoCredit' => $entry->image[0]->photoCredit,
                    ];
                }

                // Content Block(contentBlock MATRIX)
                $contentBlocks = [];
                foreach ($entry->contentBlock->all() as $block) {

                    switch ($block->type->handle) {

                        case 'heading':
                            // (heading TEXT)

                            $contentBlocks[] = [
                                'heading' => $block->heading,
                            ];
                            break;

                        case 'subheading':
                            // (subheading TEXT)

                            $contentBlocks[] = [
                                'subheading' => $block->subheading,
                            ];
                            break;

                        case 'image':
                            // (image ASSET)
                            // (imagePosition DROPDOWN)

                            $image = [];
                            if (isset($block->image[0])) {
                                $image=[
                                    'image' => $block->image[0]->url,
                                    'photoCredit' => $block->image[0]->photoCredit,
                                ];
                            }

                            $contentBlocks[] = [
                                'image' => [
                                    'image' => $image,
                                    'imagePosition' => $block->imagePosition->value,
                                ],
                            ];
                            break;

                        case 'body':
                            // (body REDACTOR)

                            $body = (string) $block->body;
                            // $body = str_replace('<script', '<figure><script', $body);
                            // $body = str_replace('</script>', '</script></figure>', $body);

                            $contentBlocks[] = [
                                'body' => $body,
                            ];
                            break;

                        case 'singleSlider':
                            // (slideHeadline TEXT)
                            // (slideImageLeftBackground ASSSET)
                            // (slideSummary TEXT)
                            // (slideButtonText TEXT)
                            // (slideUrlOverride TEXT)

                            $slideImageLeftBackground = [];
                            if (isset($block->slideImageLeftBackground[0])) {
                                $slideImageLeftBackground=[
                                    'image' => $block->slideImageLeftBackground[0]->url,
                                    'photoCredit' => $block->slideImageLeftBackground[0]->photoCredit,
                                ];
                            }

                            $contentBlocks[] = [
                                'singleSlider' => [
                                    'slideHeadline' => $block->slideHeadline,
                                    'slideImageLeftBackground' => $slideImageLeftBackground,
                                    'slideSummary' => $block->slideSummary,
                                    'slideButtonText' => $block->slideButtonText,
                                    'slideUrlOverride' => $block->slideUrlOverride,
                                ],
                            ];
                            break;

                        case 'button':
                            // (buttonText TEXT)
                            // (buttonUrl TEXT)
                            // (buttonColor DROPDOWN)

                            $contentBlocks[] = [
                                'button' => [
                                    'buttonText' => $block->buttonText,
                                    'buttonUrl' => $block->buttonUrl,
                                    'buttonColor' => $block->buttonColor->value,
                                ],
                            ];
                            break;

                        case 'callout':
                            // (calloutText TEXT)
                            // (greyCalloutBox LIGHTSWITCH)

                            $contentBlocks[] = [
                                'callout' => [
                                    'calloutText' => $block->calloutText,
                                    'greyCalloutBox' => (bool) $block->greyCalloutBox,
                                ],
                            ];
                            break;

                        case 'richTextCallout':
                            // (richTextCallout REDACTOR)
                            // (greyCalloutBox LIGHTSWITCH)

                            $richTextCallout = (string) $block->richTextCallout;
                            // $richTextCallout = str_replace('<script', '<figure><script', $richTextCallout);
                            // $richTextCallout = str_replace('</script>', '</script></figure>', $richTextCallout);

                            $contentBlocks[] = [
                                'richTextCallout' => [
                                    'richTextCallout' => $richTextCallout,
                                    'greyCalloutBox' => (bool) $block->greyCalloutBox,
                                ],
                            ];
                            break;

                        case 'twoColumns':
                            // (leftColumn REDACTOR)
                            // (rightColumn REDACTOR)

                            $leftColumn = (string) $block->leftColumn;
                            // $leftColumn = str_replace('<script', '<figure><script', $leftColumn);
                            // $leftColumn = str_replace('</script>', '</script></figure>', $leftColumn);

                            $rightColumn = (string) $block->rightColumn;
                            // $rightColumn = str_replace('<script', '<figure><script', $rightColumn);
                            // $rightColumn = str_replace('</script>', '</script></figure>', $rightColumn);

                            $contentBlocks[] = [
                                'twoColumns' => [
                                    'leftColumn' => $leftColumn,
                                    'rightColumn' => $rightColumn,
                                ],
                            ];
                            break;

                        case 'modalForm':
                            // (headline TEXT)
                            // (subtext TEXT)
                            // (leadSource TEXT)
                            // (buttonText TEXT)
                            // (delay TEXT)

                            $contentBlocks[] = [
                                'modalForm' => [
                                    'headline' => $block->headline,
                                    'subtext' => $block->subtext,
                                    'leadSource' => $block->leadSource,
                                    'buttonText' => $block->buttonText,
                                    'delay' => $block->delay,
                                ],
                            ];
                            break;

                        case 'modalLink':
                            // (headline TEXT)
                            // (subtext TEXT)
                            // (linkUrl TEXT)
                            // (buttonText TEXT)
                            // (delay NUMBER)

                            $contentBlocks[] = [
                                'modalLink' => [
                                    'headline' => $block->headline,
                                    'subtext' => $block->subtext,
                                    'linkUrl' => $block->linkUrl,
                                    'buttonText' => $block->buttonText,
                                    'delay' => $block->delay,
                                ],
                            ];
                            break;

                    }

                }

                // Blog Categories(blogCategories CATEGORIES)
                $blogCategories = [];
                foreach ($entry->blogCategories->all() as $blogCategory) {
                    $blogCategories[] = (string) $blogCategory;
                }

                $entryBody = (string) $entry->body;
                // $entryBody = str_replace('<script', '<figure><script', $entryBody);
                // $entryBody = str_replace('</script>', '</script></figure>', $entryBody);

                // $optimizedTitle = $entry->seoElementMetadata->optimizedTitle;
                $optimizedTitle = $entry->title;
                $optimizedDescription = $entry->seoElementMetadata->optimizedDescription;
                // $optimizedImage = Asset::find()
                //     ->id($entry->seoElementMetadata->optimizedImage)
                //     ->one()
                //     ->url;

                $optimizedImage = "";
                if (isset($entry->image[0])) {
                    $optimizedImage = preg_replace('/\?.*/', '', $entry->image[0]->url);
                }

                $optimizedKeywords = $entry->seoElementMetadata->optimizedKeywords;
                $canonical = $entry->seoElementMetadata->canonical;

                return [
                    'title' => $entry->title,
                    'id' => $entry->id,
                    'slug' => $entry->slug,
                    'author' => $entry->author->username,
                    'url' => $entry->getUrl(),
                    'postDate' => $entry->postDate ? $entry->postDate->format(\DateTime::ATOM) : null,
                    'expireDate' => $entry->expiryDate ? $entry->expiryDate->format(\DateTime::ATOM) : null,
                    'status' => (bool) $entry->enabled,
                    'type' => $entry->type->handle,

                    'image' => $image,
                    'body' => $entryBody,
                    'contentBlocks' => $contentBlocks,
                    'blogCategories' => $blogCategories,
                    'trackingPixelCode' => $entry->trackingPixelCode,
                    'seoElementMetadata' => [
                        'optimizedTitle' => $optimizedTitle,
                        'optimizedDescription' => $optimizedDescription,
                        'optimizedImage' => $optimizedImage,
                        'optimizedKeywords' => $optimizedKeywords,
                        'canonical' => $canonical,
                    ],
                ];
            }
        ]; },

        'api/campaign.json' => function() { return [
            'elementType' => Entry::class,
            'elementsPerPage' => 100,
            'pageParam' => 'pg',
            'criteria' => [
                'section' => 'campaignEntries',
                'limit' => null,
            ],

            'transformer' => function(Entry $entry) {
                // Fields: Header Image(headerImage ASSET), Body(body REDACTOR), Summary(summary TEXT), Grid Image(gridImage ASSET), URL Override(urlOverride TEXT), Causes(causes ENTRIES), Content Block(contentBlock MATRIX), Slide Headline(slideHeadline TEXT), Slide Summary(slideSummary TEXT), Slide Image Left Background(slideImageLeftBackground ASSET), Slide Image Right Background(slideImageRightBackground ASSET), Slide Image Right(slideImageRight ASSET), Slide Button Text(slideButtonText TEXT), Slide URL Override(slideUrlOverride TEXT), Vimeo ID(vimeoID TEXT), CQ Active Engagement(cqActiveEngagement TEXT), Element Metadata(seoElementMetadata METADATA)

                // Header Image(headerImage ASSET)
                $headerImage=[];
                if (isset($entry->headerImage[0])) {
                    $headerImage=[
                        'image' => $entry->headerImage[0]->url,
                        'photoCredit' => $entry->headerImage[0]->photoCredit,
                    ];
                }

                // Grid Image(gridImage ASSET)
                $gridImage=[];
                if (isset($entry->gridImage[0])) {
                    $gridImage=[
                        'image' => $entry->gridImage[0]->url,
                        'photoCredit' => $entry->gridImage[0]->photoCredit,
                    ];
                }

                // Slide Image Left Background(slideImageLeftBackground ASSET)
                $slideImageLeftBackground=[];
                if (isset($entry->slideImageLeftBackground[0])) {
                    $slideImageLeftBackground=[
                        'image' => $entry->slideImageLeftBackground[0]->url,
                        'photoCredit' => $entry->slideImageLeftBackground[0]->photoCredit,
                    ];
                }

                // Slide Image Right Background(slideImageRightBackground ASSET)
                $slideImageRightBackground=[];
                if (isset($entry->slideImageRightBackground[0])) {
                    $slideImageRightBackground=[
                        'image' => $entry->slideImageRightBackground[0]->url,
                        'photoCredit' => $entry->slideImageRightBackground[0]->photoCredit,
                    ];
                }

                // Slide Image Right(slideImageRight ASSET)
                $slideImageRight=[];
                if (isset($entry->slideImageRight[0])) {
                    $slideImageRight=[
                        'image' => $entry->slideImageRight[0]->url,
                        'photoCredit' => $entry->slideImageRight[0]->photoCredit,
                    ];
                }

                // Content Block(contentBlock MATRIX)
                $contentBlocks = [];
                foreach ($entry->contentBlock->all() as $block) {

                    switch ($block->type->handle) {

                        case 'heading':
                            // (heading TEXT)

                            $contentBlocks[] = [
                                'heading' => $block->heading,
                            ];
                            break;

                        case 'subheading':
                            // (subheading TEXT)

                            $contentBlocks[] = [
                                'subheading' => $block->subheading,
                            ];
                            break;

                        case 'image':
                            // (image ASSET)
                            // (imagePosition DROPDOWN)

                            $image = [];
                            if (isset($block->image[0])) {
                                $image=[
                                    'image' => $block->image[0]->url,
                                    'photoCredit' => $block->image[0]->photoCredit,
                                ];
                            }

                            $contentBlocks[] = [
                                'image' => [
                                    'image' => $image,
                                    'imagePosition' => $block->imagePosition->value,
                                ],
                            ];
                            break;

                        case 'body':
                            // (body REDACTOR)

                            $body = (string) $block->body;
                            // $body = str_replace('<script', '<figure><script', $body);
                            // $body = str_replace('</script>', '</script></figure>', $body);

                            $contentBlocks[] = [
                                'body' => $body,
                            ];
                            break;

                        case 'singleSlider':
                            // (slideHeadline TEXT)
                            // (slideImageLeftBackground ASSSET)
                            // (slideSummary TEXT)
                            // (slideButtonText TEXT)
                            // (slideUrlOverride TEXT)

                            $slideImageLeftBackground = [];
                            if (isset($block->slideImageLeftBackground[0])) {
                                $slideImageLeftBackground=[
                                    'image' => $block->slideImageLeftBackground[0]->url,
                                    'photoCredit' => $block->slideImageLeftBackground[0]->photoCredit,
                                ];
                            }

                            $contentBlocks[] = [
                                'singleSlider' => [
                                    'slideHeadline' => $block->slideHeadline,
                                    'slideImageLeftBackground' => $slideImageLeftBackground,
                                    'slideSummary' => $block->slideSummary,
                                    'slideButtonText' => $block->slideButtonText,
                                    'slideUrlOverride' => $block->slideUrlOverride,
                                ],
                            ];
                            break;

                        case 'button':
                            // (buttonText TEXT)
                            // (buttonUrl TEXT)
                            // (buttonColor DROPDOWN)

                            $contentBlocks[] = [
                                'button' => [
                                    'buttonText' => $block->buttonText,
                                    'buttonUrl' => $block->buttonUrl,
                                    'buttonColor' => $block->buttonColor->value,
                                ],
                            ];
                            break;

                        case 'callout':
                            // (calloutText TEXT)
                            // (greyCalloutBox LIGHTSWITCH)

                            $contentBlocks[] = [
                                'callout' => [
                                    'calloutText' => $block->calloutText,
                                    'greyCalloutBox' => (bool) $block->greyCalloutBox,
                                ],
                            ];
                            break;

                        case 'richTextCallout':
                            // (richTextCallout REDACTOR)
                            // (greyCalloutBox LIGHTSWITCH)

                            $richTextCallout = (string) $block->richTextCallout;
                            // $richTextCallout = str_replace('<script', '<figure><script', $richTextCallout);
                            // $richTextCallout = str_replace('</script>', '</script></figure>', $richTextCallout);

                            $contentBlocks[] = [
                                'richTextCallout' => [
                                    'richTextCallout' => $richTextCallout,
                                    'greyCalloutBox' => (bool) $block->greyCalloutBox,
                                ],
                            ];
                            break;

                        case 'twoColumns':
                            // (leftColumn REDACTOR)
                            // (rightColumn REDACTOR)

                            $leftColumn = (string) $block->leftColumn;
                            // $leftColumn = str_replace('<script', '<figure><script', $leftColumn);
                            // $leftColumn = str_replace('</script>', '</script></figure>', $leftColumn);

                            $rightColumn = (string) $block->rightColumn;
                            // $rightColumn = str_replace('<script', '<figure><script', $rightColumn);
                            // $rightColumn = str_replace('</script>', '</script></figure>', $rightColumn);

                            $contentBlocks[] = [
                                'twoColumns' => [
                                    'leftColumn' => $leftColumn,
                                    'rightColumn' => $rightColumn,
                                ],
                            ];
                            break;

                        case 'modalForm':
                            // (headline TEXT)
                            // (subtext TEXT)
                            // (leadSource TEXT)
                            // (buttonText TEXT)
                            // (delay TEXT)

                            $contentBlocks[] = [
                                'modalForm' => [
                                    'headline' => $block->headline,
                                    'subtext' => $block->subtext,
                                    'leadSource' => $block->leadSource,
                                    'buttonText' => $block->buttonText,
                                    'delay' => $block->delay,
                                ],
                            ];
                            break;

                        case 'modalLink':
                            // (headline TEXT)
                            // (subtext TEXT)
                            // (linkUrl TEXT)
                            // (buttonText TEXT)
                            // (delay NUMBER)

                            $contentBlocks[] = [
                                'modalLink' => [
                                    'headline' => $block->headline,
                                    'subtext' => $block->subtext,
                                    'linkUrl' => $block->linkUrl,
                                    'buttonText' => $block->buttonText,
                                    'delay' => $block->delay,
                                ],
                            ];
                            break;

                    }

                }

                // Causes(causes ENTRIES)
                $causesOutput = [];
                foreach ($entry->causes->all() as $causes) {
                    $causesOutput[] = $causes->title;
                }

                $entryBody = (string) $entry->body;
                // $entryBody = str_replace('<script', '<figure><script', $entryBody);
                // $entryBody = str_replace('</script>', '</script></figure>', $entryBody);

                // $optimizedTitle = $entry->seoElementMetadata->optimizedTitle;
                $optimizedTitle = $entry->title;
                $optimizedDescription = $entry->seoElementMetadata->optimizedDescription;
                // $optimizedImage = Asset::find()
                //     ->id($entry->seoElementMetadata->optimizedImage)
                //     ->one()
                //     ->url;

                $optimizedImage = "";
                if (isset($entry->image[0])) {
                    $optimizedImage = preg_replace('/\?.*/', '', $entry->headerImage[0]->url);
                }

                $optimizedKeywords = $entry->seoElementMetadata->optimizedKeywords;
                $canonical = $entry->seoElementMetadata->canonical;

                return [
                    'title' => $entry->title,
                    'id' => $entry->id,
                    'slug' => $entry->slug,
                    'author' => $entry->author->username,
                    'url' => $entry->getUrl(),
                    'postDate' => $entry->postDate ? $entry->postDate->format(\DateTime::ATOM) : null,
                    'expireDate' => $entry->expiryDate ? $entry->expiryDate->format(\DateTime::ATOM) : null,
                    'status' => (bool) $entry->enabled,
                    'type' => $entry->type->handle,

                    'headerImage' => $headerImage,
                    'body' => $entryBody,
                    'summary' => $entry->summary,
                    'gridImage' => $gridImage,
                    'urlOverride' => $entry->urlOverride,
                    'causes' => $causesOutput,
                    'contentBlocks' => $contentBlocks,
                    'slideHeadline' => $entry->slideHeadline,
                    'slideSummary' => $entry->slideSummary,
                    'slideImageLeftBackground' => $slideImageLeftBackground,
                    'slideImageRightBackground' => $slideImageRightBackground,
                    'slideImageRight' => $slideImageRight,
                    'slideButtonText' => $entry->slideButtonText,
                    'slideUrlOverride' => $entry->slideUrlOverride,
                    'vimeoID' => $entry->vimeoID,
                    'cqActiveEngagement' => $entry->cqActiveEngagement,
                    'seoElementMetadata' => [
                        'optimizedTitle' => $optimizedTitle,
                        'optimizedDescription' => $optimizedDescription,
                        'optimizedImage' => $optimizedImage,
                        'optimizedKeywords' => $optimizedKeywords,
                        'canonical' => $canonical,
                    ],
                ];
            }
        ]; },

        'api/pages.json' => function() { return [
            'elementType' => Entry::class,
            'elementsPerPage' => 100,
            'pageParam' => 'pg',
            'criteria' => [
                'section' => 'pages',
                'limit' => null,
            ],

            'transformer' => function(Entry $entry) {
                // 2 Types (pages, pagesNoTitle)
                // Fields:  Heading(heading TEXT), Body(body REDACTOR), Content Block(contentBlock MATRIX), Header Image(headerImage ASSET), Subtitle(subtitle TEXT), Hide Content?(hideContent LIGHTSWITCH), Element Metadata(seoElementMetadata METADATA)

                // Header Image(headerImage ASSET)
                $headerImage = [];
                if (isset($entry->headerImage[0])) {
                    $headerImage=[
                        'image' => $entry->headerImage[0]->url,
                        'photoCredit' => $entry->headerImage[0]->photoCredit,
                    ];
                }

                // Content Block(contentBlock MATRIX)
                $contentBlocks = [];
                foreach ($entry->contentBlock->all() as $block) {

                    switch ($block->type->handle) {

                        case 'heading':
                            // (heading TEXT)

                            $contentBlocks[] = [
                                'heading' => $block->heading,
                            ];
                            break;

                        case 'subheading':
                            // (subheading TEXT)

                            $contentBlocks[] = [
                                'subheading' => $block->subheading,
                            ];
                            break;

                        case 'image':
                            // (image ASSET)
                            // (imagePosition DROPDOWN)

                            $image = [];
                            if (isset($block->image[0])) {
                                $image=[
                                    'image' => $block->image[0]->url,
                                    'photoCredit' => $block->image[0]->photoCredit,
                                ];
                            }

                            $contentBlocks[] = [
                                'image' => [
                                    'image' => $image,
                                    'imagePosition' => $block->imagePosition->value,
                                ],
                            ];
                            break;

                        case 'body':
                            // (body REDACTOR)

                            $body = (string) $block->body;
                            // $body = str_replace('<script', '<figure><script', $body);
                            // $body = str_replace('</script>', '</script></figure>', $body);

                            $contentBlocks[] = [
                                'body' => $body,
                            ];
                            break;

                        case 'singleSlider':
                            // (slideHeadline TEXT)
                            // (slideImageLeftBackground ASSSET)
                            // (slideSummary TEXT)
                            // (slideButtonText TEXT)
                            // (slideUrlOverride TEXT)

                            $slideImageLeftBackground = [];
                            if (isset($block->slideImageLeftBackground[0])) {
                                $slideImageLeftBackground=[
                                    'image' => $block->slideImageLeftBackground[0]->url,
                                    'photoCredit' => $block->slideImageLeftBackground[0]->photoCredit,
                                ];
                            }

                            $contentBlocks[] = [
                                'singleSlider' => [
                                    'slideHeadline' => $block->slideHeadline,
                                    'slideImageLeftBackground' => $slideImageLeftBackground,
                                    'slideSummary' => $block->slideSummary,
                                    'slideButtonText' => $block->slideButtonText,
                                    'slideUrlOverride' => $block->slideUrlOverride,
                                ],
                            ];
                            break;

                        case 'button':
                            // (buttonText TEXT)
                            // (buttonUrl TEXT)
                            // (buttonColor DROPDOWN)

                            $contentBlocks[] = [
                                'button' => [
                                    'buttonText' => $block->buttonText,
                                    'buttonUrl' => $block->buttonUrl,
                                    'buttonColor' => $block->buttonColor->value,
                                ],
                            ];
                            break;

                        case 'callout':
                            // (calloutText TEXT)
                            // (greyCalloutBox LIGHTSWITCH)

                            $contentBlocks[] = [
                                'callout' => [
                                    'calloutText' => $block->calloutText,
                                    'greyCalloutBox' => (bool) $block->greyCalloutBox,
                                ],
                            ];
                            break;

                        case 'richTextCallout':
                            // (richTextCallout REDACTOR)
                            // (greyCalloutBox LIGHTSWITCH)

                            $richTextCallout = (string) $block->richTextCallout;
                            // $richTextCallout = str_replace('<script', '<figure><script', $richTextCallout);
                            // $richTextCallout = str_replace('</script>', '</script></figure>', $richTextCallout);

                            $contentBlocks[] = [
                                'richTextCallout' => [
                                    'richTextCallout' => $richTextCallout,
                                    'greyCalloutBox' => (bool) $block->greyCalloutBox,
                                ],
                            ];
                            break;

                        case 'twoColumns':
                            // (leftColumn REDACTOR)
                            // (rightColumn REDACTOR)

                            $leftColumn = (string) $block->leftColumn;
                            // $leftColumn = str_replace('<script', '<figure><script', $leftColumn);
                            // $leftColumn = str_replace('</script>', '</script></figure>', $leftColumn);

                            $rightColumn = (string) $block->rightColumn;
                            // $rightColumn = str_replace('<script', '<figure><script', $rightColumn);
                            // $rightColumn = str_replace('</script>', '</script></figure>', $rightColumn);

                            $contentBlocks[] = [
                                'twoColumns' => [
                                    'leftColumn' => $leftColumn,
                                    'rightColumn' => $rightColumn,
                                ],
                            ];
                            break;

                        case 'modalForm':
                            // (headline TEXT)
                            // (subtext TEXT)
                            // (leadSource TEXT)
                            // (buttonText TEXT)
                            // (delay TEXT)

                            $contentBlocks[] = [
                                'modalForm' => [
                                    'headline' => $block->headline,
                                    'subtext' => $block->subtext,
                                    'leadSource' => $block->leadSource,
                                    'buttonText' => $block->buttonText,
                                    'delay' => $block->delay,
                                ],
                            ];
                            break;

                        case 'modalLink':
                            // (headline TEXT)
                            // (subtext TEXT)
                            // (linkUrl TEXT)
                            // (buttonText TEXT)
                            // (delay NUMBER)

                            $contentBlocks[] = [
                                'modalLink' => [
                                    'headline' => $block->headline,
                                    'subtext' => $block->subtext,
                                    'linkUrl' => $block->linkUrl,
                                    'buttonText' => $block->buttonText,
                                    'delay' => $block->delay,
                                ],
                            ];
                            break;

                    }

                }

                $entryBody = (string) $entry->body;
                // $entryBody = str_replace('<script', '<figure><script', $entryBody);
                // $entryBody = str_replace('</script>', '</script></figure>', $entryBody);

                // $optimizedTitle = $entry->seoElementMetadata->optimizedTitle;
                $optimizedTitle = $entry->title;
                $optimizedDescription = $entry->seoElementMetadata->optimizedDescription;
                // $optimizedImage = Asset::find()
                //     ->id($entry->seoElementMetadata->optimizedImage)
                //     ->one()
                //     ->url;

                $optimizedImage = "";
                if (isset($entry->image[0])) {
                    $optimizedImage = preg_replace('/\?.*/', '', $entry->headerImage[0]->url);
                }

                $optimizedKeywords = $entry->seoElementMetadata->optimizedKeywords;
                $canonical = $entry->seoElementMetadata->canonical;

                return [
                    'title' => $entry->title,
                    'id' => $entry->id,
                    'slug' => $entry->slug,
                    'author' => $entry->author->username,
                    'url' => $entry->getUrl(),
                    'postDate' => $entry->postDate ? $entry->postDate->format(\DateTime::ATOM) : null,
                    'expireDate' => $entry->expiryDate ? $entry->expiryDate->format(\DateTime::ATOM) : null,
                    'status' => (bool) $entry->enabled,
                    'type' => $entry->type->handle,

                    'heading' => $entry->heading,
                    'body' => $entryBody,
                    'contentBlocks' => $contentBlocks,
                    'headerImage' => $headerImage,
                    'subtitle' => $entry->subtitle,
                    'hideContent' => (bool) $entry->hideContent,
                    'seoElementMetadata' => [
                        'optimizedTitle' => $optimizedTitle,
                        'optimizedDescription' => $optimizedDescription,
                        'optimizedImage' => $optimizedImage,
                        'optimizedKeywords' => $optimizedKeywords,
                        'canonical' => $canonical,
                    ],
                ];
            }
        ]; },

        'api/news.json' => function() { return [
            'elementType' => Entry::class,
            'elementsPerPage' => 100,
            'pageParam' => 'pg',
            'criteria' => [
                'section' => 'newsEntries',
                'limit' => null,
            ],

            'transformer' => function(Entry $entry) {
                // Fields: Header Image(headerImage ASSET), Body(body REDACTOR), Causes(causes ENTRIES), Content Block(contentBlock MATRIX), Element Metadata(seoElementMetadata METADATA)

                // Header Image(headerImage ASSET)
                $headerImage = [];
                if (isset($entry->headerImage[0])) {
                    $headerImage=[
                        'image' => $entry->headerImage[0]->url,
                        'photoCredit' => $entry->headerImage[0]->photoCredit,
                    ];
                }

                // Content Block(contentBlock MATRIX)
                $contentBlocks = [];
                foreach ($entry->contentBlock->all() as $block) {

                    switch ($block->type->handle) {

                        case 'heading':
                            // (heading TEXT)

                            $contentBlocks[] = [
                                'heading' => $block->heading,
                            ];
                            break;

                        case 'subheading':
                            // (subheading TEXT)

                            $contentBlocks[] = [
                                'subheading' => $block->subheading,
                            ];
                            break;

                        case 'image':
                            // (image ASSET)
                            // (imagePosition DROPDOWN)

                            $image = [];
                            if (isset($block->image[0])) {
                                $image=[
                                    'image' => $block->image[0]->url,
                                    'photoCredit' => $block->image[0]->photoCredit,
                                ];
                            }

                            $contentBlocks[] = [
                                'image' => [
                                    'image' => $image,
                                    'imagePosition' => $block->imagePosition->value,
                                ],
                            ];
                            break;

                        case 'body':
                            // (body REDACTOR)

                            $body = (string) $block->body;
                            // $body = str_replace('<script', '<figure><script', $body);
                            // $body = str_replace('</script>', '</script></figure>', $body);

                            $contentBlocks[] = [
                                'body' => $body,
                            ];
                            break;

                        case 'singleSlider':
                            // (slideHeadline TEXT)
                            // (slideImageLeftBackground ASSSET)
                            // (slideSummary TEXT)
                            // (slideButtonText TEXT)
                            // (slideUrlOverride TEXT)

                            $slideImageLeftBackground = [];
                            if (isset($block->slideImageLeftBackground[0])) {
                                $slideImageLeftBackground=[
                                    'image' => $block->slideImageLeftBackground[0]->url,
                                    'photoCredit' => $block->slideImageLeftBackground[0]->photoCredit,
                                ];
                            }

                            $contentBlocks[] = [
                                'singleSlider' => [
                                    'slideHeadline' => $block->slideHeadline,
                                    'slideImageLeftBackground' => $slideImageLeftBackground,
                                    'slideSummary' => $block->slideSummary,
                                    'slideButtonText' => $block->slideButtonText,
                                    'slideUrlOverride' => $block->slideUrlOverride,
                                ],
                            ];
                            break;

                        case 'button':
                            // (buttonText TEXT)
                            // (buttonUrl TEXT)
                            // (buttonColor DROPDOWN)

                            $contentBlocks[] = [
                                'button' => [
                                    'buttonText' => $block->buttonText,
                                    'buttonUrl' => $block->buttonUrl,
                                    'buttonColor' => $block->buttonColor->value,
                                ],
                            ];
                            break;

                        case 'callout':
                            // (calloutText TEXT)
                            // (greyCalloutBox LIGHTSWITCH)

                            $contentBlocks[] = [
                                'callout' => [
                                    'calloutText' => $block->calloutText,
                                    'greyCalloutBox' => (bool) $block->greyCalloutBox,
                                ],
                            ];
                            break;

                        case 'richTextCallout':
                            // (richTextCallout REDACTOR)
                            // (greyCalloutBox LIGHTSWITCH)

                            $richTextCallout = (string) $block->richTextCallout;
                            // $richTextCallout = str_replace('<script', '<figure><script', $richTextCallout);
                            // $richTextCallout = str_replace('</script>', '</script></figure>', $richTextCallout);

                            $contentBlocks[] = [
                                'richTextCallout' => [
                                    'richTextCallout' => $richTextCallout,
                                    'greyCalloutBox' => (bool) $block->greyCalloutBox,
                                ],
                            ];
                            break;

                        case 'twoColumns':
                            // (leftColumn REDACTOR)
                            // (rightColumn REDACTOR)

                            $leftColumn = (string) $block->leftColumn;
                            // $leftColumn = str_replace('<script', '<figure><script', $leftColumn);
                            // $leftColumn = str_replace('</script>', '</script></figure>', $leftColumn);

                            $rightColumn = (string) $block->rightColumn;
                            // $rightColumn = str_replace('<script', '<figure><script', $rightColumn);
                            // $rightColumn = str_replace('</script>', '</script></figure>', $rightColumn);

                            $contentBlocks[] = [
                                'twoColumns' => [
                                    'leftColumn' => $leftColumn,
                                    'rightColumn' => $rightColumn,
                                ],
                            ];
                            break;

                        case 'modalForm':
                            // (headline TEXT)
                            // (subtext TEXT)
                            // (leadSource TEXT)
                            // (buttonText TEXT)
                            // (delay TEXT)

                            $contentBlocks[] = [
                                'modalForm' => [
                                    'headline' => $block->headline,
                                    'subtext' => $block->subtext,
                                    'leadSource' => $block->leadSource,
                                    'buttonText' => $block->buttonText,
                                    'delay' => $block->delay,
                                ],
                            ];
                            break;

                        case 'modalLink':
                            // (headline TEXT)
                            // (subtext TEXT)
                            // (linkUrl TEXT)
                            // (buttonText TEXT)
                            // (delay NUMBER)

                            $contentBlocks[] = [
                                'modalLink' => [
                                    'headline' => $block->headline,
                                    'subtext' => $block->subtext,
                                    'linkUrl' => $block->linkUrl,
                                    'buttonText' => $block->buttonText,
                                    'delay' => $block->delay,
                                ],
                            ];
                            break;

                    }

                }

                // Causes(causes ENTRIES)
                $causesOutput = [];
                foreach ($entry->causes->all() as $causes) {
                    $causesOutput[] = $causes->title;
                }

                $entryBody = (string) $entry->body;
                // $entryBody = str_replace('<script', '<figure><script', $entryBody);
                // $entryBody = str_replace('</script>', '</script></figure>', $entryBody);

                // $optimizedTitle = $entry->seoElementMetadata->optimizedTitle;
                $optimizedTitle = $entry->title;
                $optimizedDescription = $entry->seoElementMetadata->optimizedDescription;
                // $optimizedImage = Asset::find()
                //     ->id($entry->seoElementMetadata->optimizedImage)
                //     ->one()
                //     ->url;

                $optimizedImage = "";
                if (isset($entry->image[0])) {
                    $optimizedImage = preg_replace('/\?.*/', '', $entry->headerImage[0]->url);
                }

                $optimizedKeywords = $entry->seoElementMetadata->optimizedKeywords;
                $canonical = $entry->seoElementMetadata->canonical;

                return [
                    'title' => $entry->title,
                    'id' => $entry->id,
                    'slug' => $entry->slug,
                    'author' => $entry->author->username,
                    'url' => $entry->getUrl(),
                    'postDate' => $entry->postDate ? $entry->postDate->format(\DateTime::ATOM) : null,
                    'expireDate' => $entry->expiryDate ? $entry->expiryDate->format(\DateTime::ATOM) : null,
                    'status' => (bool) $entry->enabled,
                    'type' => $entry->type->handle,

                    'headerImage' => $headerImage,
                    'body' => $entryBody,
                    'causes' => $causesOutput,
                    'contentBlocks' => $contentBlocks,
                    'seoElementMetadata' => [
                        'optimizedTitle' => $optimizedTitle,
                        'optimizedDescription' => $optimizedDescription,
                        'optimizedImage' => $optimizedImage,
                        'optimizedKeywords' => $optimizedKeywords,
                        'canonical' => $canonical,
                    ],
                ];
            }
        ]; },

        'api/learn-circle.json' => function() { return [
            'elementType' => Entry::class,
            'elementsPerPage' => 100,
            'pageParam' => 'pg',
            'criteria' => [
                'section' => 'educateYourselfEntries',
                'type' => 'circleGrid',
                'limit' => null,
            ],

            'transformer' => function(Entry $entry) {
                // Circle Grid
                // Fields:
                // Header Image(headerImage ASSET),
                // Subtitle(subtitle TEXT),
                // Body(body REDACTOR),
                // Slide Headline(slideHeadline TEXT), Slide Summary(slideSummary TEXT), Slide Image Left Background(slideImageLeftBackground ASSET), Slide Image Right Background(slideImageRightBackground ASSET), Slide Image Right(slideImageRight ASSET), Slide Button Text(slideButtonText TEXT), Slide URL Override(slideUrlOverride TEXT)
                // Vimeo ID(vimeoID TEXT),
                // CQ Active Engagement(cqActiveEngagement TEXT),
                // Element Metadata(seoElementMetadata METADATA)

                // Header Image(headerImage ASSET)
                $headerImage = [];
                if (isset($entry->headerImage[0])) {
                    $headerImage=[
                        'image' => $entry->headerImage[0]->url,
                        'photoCredit' => $entry->headerImage[0]->photoCredit,
                    ];
                }

                // Slide Image Left Background(slideImageLeftBackground ASSET)
                $slideImageLeftBackground = [];
                if (isset($entry->slideImageLeftBackground[0])) {
                    $slideImageLeftBackground=[
                        'image' => $entry->slideImageLeftBackground[0]->url,
                        'photoCredit' => $entry->slideImageLeftBackground[0]->photoCredit,
                    ];
                }

                // Slide Image Right Background(slideImageRightBackground ASSET)
                $slideImageRightBackground = [];
                if (isset($entry->slideImageRightBackground[0])) {
                    $slideImageRightBackground=[
                        'image' => $entry->slideImageRightBackground[0]->url,
                        'photoCredit' => $entry->slideImageRightBackground[0]->photoCredit,
                    ];
                }

                // Slide Image Right(slideImageRight ASSET)
                $slideImageRight = [];
                if (isset($entry->slideImageRight[0])) {
                    $slideImageRight=[
                        'image' => $entry->slideImageRight[0]->url,
                        'photoCredit' => $entry->slideImageRight[0]->photoCredit,
                    ];
                }

                $entryBody = (string) $entry->body;
                // $entryBody = str_replace('<script', '<figure><script', $entryBody);
                // $entryBody = str_replace('</script>', '</script></figure>', $entryBody);

                $optimizedTitle = $entry->seoElementMetadata->optimizedTitle;
                $optimizedDescription = $entry->seoElementMetadata->optimizedDescription;

                $optimizedImage = "";
                if ($entry->seoElementMetadata->optimizedImage != "") {
                    $optimizedImage = Asset::find()
                        ->id($entry->seoElementMetadata->optimizedImage)
                        ->one()
                        ->url;
                }

                $optimizedKeywords = $entry->seoElementMetadata->optimizedKeywords;
                $canonical = $entry->seoElementMetadata->canonical;

                return [
                    'title' => $entry->title,
                    'id' => $entry->id,
                    'slug' => $entry->slug,
                    'author' => $entry->author->username,
                    'url' => $entry->getUrl(),
                    'postDate' => $entry->postDate ? $entry->postDate->format(\DateTime::ATOM) : null,
                    'expireDate' => $entry->expiryDate ? $entry->expiryDate->format(\DateTime::ATOM) : null,
                    'status' => (bool) $entry->enabled,
                    'type' => $entry->type->handle,
                    'parent' => $entry->parent ? $entry->parent->slug : null,

                    'headerImage' => $headerImage,
                    'subtitle' => $entry->subtitle,
                    'body' => $entryBody,
                    'slideHeadline' => $entry->slideHeadline,
                    'slideSummary' => $entry->slideSummary,
                    'slideImageLeftBackground' => $slideImageLeftBackground,
                    'slideImageRightBackground' => $slideImageRightBackground,
                    'slideImageRight' => $slideImageRight,
                    'slideButtonText' => $entry->slideButtonText,
                    'slideUrlOverride' => $entry->slideUrlOverride,
                    'vimeoID' => $entry->vimeoID,
                    'cqActiveEngagement' => $entry->cqActiveEngagement,
                    'seoElementMetadata' => [
                        'optimizedTitle' => $optimizedTitle,
                        'optimizedDescription' => $optimizedDescription,
                        'optimizedImage' => $optimizedImage,
                        'optimizedKeywords' => $optimizedKeywords,
                        'canonical' => $canonical,
                    ],
                ];
            }
        ]; },

        'api/learn-detail.json' => function() { return [
            'elementType' => Entry::class,
            'elementsPerPage' => 100,
            'pageParam' => 'pg',
            'criteria' => [
                'section' => 'educateYourselfEntries',
                'type' => 'detail',
                'limit' => null,
            ],

            'transformer' => function(Entry $entry) {

                // Detail
                // Fields:

                // Header Image(headerImage ASSET),
                // Subtitle(subtitle TEXT),
                // Body(body REDACTOR),
                // Summary(summary TEXT),
                // Tips Headline(tipsHeadline TEXT),
                // Tips(tips MATRIX),
                // Grid Image(gridImage ASSETS),
                // Content Block (contentBlock MATRIX),
                // Resources(resources ENTRIES),
                // Slide Headline(slideHeadline TEXT), Slide Summary(slideSummary TEXT), Slide Image Left Background(slideImageLeftBackground ASSET), Slide Image Right Background(slideImageRightBackground ASSET), Slide Image Right(slideImageRight ASSET), Slide Button Text(slideButtonText TEXT), Slide URL Override(slideUrlOverride TEXT)
                // Vimeo ID(vimeoID TEXT),
                // CQ Active Engagement(cqActiveEngagement TEXT),
                // Include Yonder Widget(includeYonderWidget LIGHTSWITCH),
                // Yonder Location IDs(yonderLocationIds TEXT),
                // Element Metadata(seoElementMetadata METADATA)

                // Header Image(headerImage ASSET)
                $headerImage = [];
                if (isset($entry->headerImage[0])) {
                    $headerImage=[
                        'image' => $entry->headerImage[0]->url,
                        'photoCredit' => $entry->headerImage[0]->photoCredit,
                    ];
                }

                // Grid Image(gridImage ASSET)
                $gridImage = [];
                if (isset($entry->gridImage[0])) {
                    $gridImage=[
                        'image' => $entry->gridImage[0]->url,
                        'photoCredit' => $entry->gridImage[0]->photoCredit,
                    ];
                }

                // Slide Image Left Background(slideImageLeftBackground ASSET)
                $slideImageLeftBackground = [];
                if (isset($entry->slideImageLeftBackground[0])) {
                    $slideImageLeftBackground=[
                        'image' => $entry->slideImageLeftBackground[0]->url,
                        'photoCredit' => $entry->slideImageLeftBackground[0]->photoCredit,
                    ];
                }

                // Slide Image Right Background(slideImageRightBackground ASSET)
                $slideImageRightBackground = [];
                if (isset($entry->slideImageRightBackground[0])) {
                    $slideImageRightBackground=[
                        'image' => $entry->slideImageRightBackground[0]->url,
                        'photoCredit' => $entry->slideImageRightBackground[0]->photoCredit,
                    ];
                }

                // Slide Image Right(slideImageRight ASSET)
                $slideImageRight = [];
                if (isset($entry->slideImageRight[0])) {
                    $slideImageRight=[
                        'image' => $entry->slideImageRight[0]->url,
                        'photoCredit' => $entry->slideImageRight[0]->photoCredit,
                    ];
                }

                // Content Block(contentBlock MATRIX)
                $contentBlocks = [];
                foreach ($entry->contentBlock->all() as $block) {

                    switch ($block->type->handle) {

                        case 'heading':
                            // (heading TEXT)

                            $contentBlocks[] = [
                                'heading' => $block->heading,
                            ];
                            break;

                        case 'subheading':
                            // (subheading TEXT)

                            $contentBlocks[] = [
                                'subheading' => $block->subheading,
                            ];
                            break;

                        case 'image':
                            // (image ASSET)
                            // (imagePosition DROPDOWN)

                            $image = [];
                            if (isset($block->image[0])) {
                                $image=[
                                    'image' => $block->image[0]->url,
                                    'photoCredit' => $block->image[0]->photoCredit,
                                ];
                            }

                            $contentBlocks[] = [
                                'image' => [
                                    'image' => $image,
                                    'imagePosition' => $block->imagePosition->value,
                                ],
                            ];
                            break;

                        case 'body':
                            // (body REDACTOR)

                            $body = (string) $block->body;
                            // $body = str_replace('<script', '<figure><script', $body);
                            // $body = str_replace('</script>', '</script></figure>', $body);

                            $contentBlocks[] = [
                                'body' => $body,
                            ];
                            break;

                        case 'singleSlider':
                            // (slideHeadline TEXT)
                            // (slideImageLeftBackground ASSSET)
                            // (slideSummary TEXT)
                            // (slideButtonText TEXT)
                            // (slideUrlOverride TEXT)

                            $slideImageLeftBackground = [];
                            if (isset($block->slideImageLeftBackground[0])) {
                                $slideImageLeftBackground=[
                                    'image' => $block->slideImageLeftBackground[0]->url,
                                    'photoCredit' => $block->slideImageLeftBackground[0]->photoCredit,
                                ];
                            }

                            $contentBlocks[] = [
                                'singleSlider' => [
                                    'slideHeadline' => $block->slideHeadline,
                                    'slideImageLeftBackground' => $slideImageLeftBackground,
                                    'slideSummary' => $block->slideSummary,
                                    'slideButtonText' => $block->slideButtonText,
                                    'slideUrlOverride' => $block->slideUrlOverride,
                                ],
                            ];
                            break;

                        case 'button':
                            // (buttonText TEXT)
                            // (buttonUrl TEXT)
                            // (buttonColor DROPDOWN)

                            $contentBlocks[] = [
                                'button' => [
                                    'buttonText' => $block->buttonText,
                                    'buttonUrl' => $block->buttonUrl,
                                    'buttonColor' => $block->buttonColor->value,
                                ],
                            ];
                            break;

                        case 'callout':
                            // (calloutText TEXT)
                            // (greyCalloutBox LIGHTSWITCH)

                            $contentBlocks[] = [
                                'callout' => [
                                    'calloutText' => $block->calloutText,
                                    'greyCalloutBox' => (bool) $block->greyCalloutBox,
                                ],
                            ];
                            break;

                        case 'richTextCallout':
                            // (richTextCallout REDACTOR)
                            // (greyCalloutBox LIGHTSWITCH)

                            $richTextCallout = (string) $block->richTextCallout;
                            // $richTextCallout = str_replace('<script', '<figure><script', $richTextCallout);
                            // $richTextCallout = str_replace('</script>', '</script></figure>', $richTextCallout);

                            $contentBlocks[] = [
                                'richTextCallout' => [
                                    'richTextCallout' => $richTextCallout,
                                    'greyCalloutBox' => (bool) $block->greyCalloutBox,
                                ],
                            ];
                            break;

                        case 'twoColumns':
                            // (leftColumn REDACTOR)
                            // (rightColumn REDACTOR)

                            $leftColumn = (string) $block->leftColumn;
                            // $leftColumn = str_replace('<script', '<figure><script', $leftColumn);
                            // $leftColumn = str_replace('</script>', '</script></figure>', $leftColumn);

                            $rightColumn = (string) $block->rightColumn;
                            // $rightColumn = str_replace('<script', '<figure><script', $rightColumn);
                            // $rightColumn = str_replace('</script>', '</script></figure>', $rightColumn);

                            $contentBlocks[] = [
                                'twoColumns' => [
                                    'leftColumn' => $leftColumn,
                                    'rightColumn' => $rightColumn,
                                ],
                            ];
                            break;

                        case 'modalForm':
                            // (headline TEXT)
                            // (subtext TEXT)
                            // (leadSource TEXT)
                            // (buttonText TEXT)
                            // (delay TEXT)

                            $contentBlocks[] = [
                                'modalForm' => [
                                    'headline' => $block->headline,
                                    'subtext' => $block->subtext,
                                    'leadSource' => $block->leadSource,
                                    'buttonText' => $block->buttonText,
                                    'delay' => $block->delay,
                                ],
                            ];
                            break;

                        case 'modalLink':
                            // (headline TEXT)
                            // (subtext TEXT)
                            // (linkUrl TEXT)
                            // (buttonText TEXT)
                            // (delay NUMBER)

                            $contentBlocks[] = [
                                'modalLink' => [
                                    'headline' => $block->headline,
                                    'subtext' => $block->subtext,
                                    'linkUrl' => $block->linkUrl,
                                    'buttonText' => $block->buttonText,
                                    'delay' => $block->delay,
                                ],
                            ];
                            break;

                    }

                }

                // Resources(resources ENTRIES)
                $resourcesOutput = [];
                foreach ($entry->resources->all() as $resources) {
                    $resourcesOutput[] = $resources->title;
                }

                // Content Block(contentBlock MATRIX)
                $tips = [];
                foreach ($entry->tips->all() as $tip) {

                    switch ($tip->type->handle) {

                        case 'tipEntry':
                            // (tipTitle TEXT)

                            $tips[] = [
                                'tipTitle' => $tip->tipTitle,
                            ];
                            break;

                    }
                }

                $entryBody = (string) $entry->body;
                // $entryBody = str_replace('<script', '<figure><script', $entryBody);
                // $entryBody = str_replace('</script>', '</script></figure>', $entryBody);

                $optimizedTitle = $entry->seoElementMetadata->optimizedTitle;
                $optimizedDescription = $entry->seoElementMetadata->optimizedDescription;
                $optimizedImage = "";
                if ($entry->seoElementMetadata->optimizedImage != "") {
                    $optimizedImage = Asset::find()
                        ->id($entry->seoElementMetadata->optimizedImage)
                        ->one()
                        ->url;
                }
                $optimizedKeywords = $entry->seoElementMetadata->optimizedKeywords;
                $canonical = $entry->seoElementMetadata->canonical;

                return [
                    'title' => $entry->title,
                    'id' => $entry->id,
                    'slug' => $entry->slug,
                    'author' => $entry->author->username,
                    'url' => $entry->getUrl(),
                    'postDate' => $entry->postDate ? $entry->postDate->format(\DateTime::ATOM) : null,
                    'expireDate' => $entry->expiryDate ? $entry->expiryDate->format(\DateTime::ATOM) : null,
                    'status' => (bool) $entry->enabled,
                    'type' => $entry->type->handle,
                    'parent' => $entry->parent ? $entry->parent->slug : null,
                    'headerImage' => $headerImage,
                    'subtitle' => $entry->subtitle,
                    'body' => $entryBody,
                    'summary' => $entry->summary,
                    'tipsHeadline' => $entry->tipsHeadline,
                    'tips' => $tips,
                    'gridImage' => $gridImage,
                    'contentBlocks' => $contentBlocks,
                    'resources' => $resourcesOutput,
                    'slideHeadline' => $entry->slideHeadline,
                    'slideSummary' => $entry->slideSummary,
                    'slideImageLeftBackground' => $slideImageLeftBackground,
                    'slideImageRightBackground' => $slideImageRightBackground,
                    'slideImageRight' => $slideImageRight,
                    'slideButtonText' => $entry->slideButtonText,
                    'slideUrlOverride' => $entry->slideUrlOverride,
                    'vimeoID' => $entry->vimeoID,
                    'cqActiveEngagement' => $entry->cqActiveEngagement,
                    'cqActiveEngagement' => (bool) $entry->includeYonderWidget,
                    'cqActiveEngagement' => $entry->yonderLocationIds,
                    'seoElementMetadata' => [
                        'optimizedTitle' => $optimizedTitle,
                        'optimizedDescription' => $optimizedDescription,
                        'optimizedImage' => $optimizedImage,
                        'optimizedKeywords' => $optimizedKeywords,
                        'canonical' => $canonical,
                    ],
                ];
            }
        ]; },

        'api/resource-center.json' => function() { return [
            'elementType' => Entry::class,
            'elementsPerPage' => 100,
            'pageParam' => 'pg',
            'criteria' => [
                'section' => 'resourceCenter',
                'limit' => null,
            ],

            'transformer' => function(Entry $entry) {
                // Fields:

                // Header Image(headerImage ASSET),
                // Grid Image(gridImage ASSETS),
                // Body(body REDACTOR),
                // Summary(summary TEXT),
                // Content Block (contentBlock MATRIX),
                // URL Override(urlOverride TEXT)
                // Asset Download(assetDownload ASSET)
                // Tags(tags TAGS),

                // Header Image(headerImage ASSET)
                $headerImage = [];
                if (isset($entry->headerImage[0])) {
                    $headerImage=[
                        'image' => $entry->headerImage[0]->url,
                        'photoCredit' => $entry->headerImage[0]->photoCredit,
                    ];
                }

                // Grid Image(gridImage ASSET)
                $gridImage = [];
                if (isset($entry->gridImage[0])) {
                    $gridImage=[
                        'image' => $entry->gridImage[0]->url,
                        'photoCredit' => $entry->gridImage[0]->photoCredit,
                    ];
                }

                // Asset Download(assetDownload ASSET)
                $assetDownload = [];
                if (isset($entry->assetDownload[0])) {
                    $assetDownload=[
                        'image' => $entry->assetDownload[0]->url,
                        'photoCredit' => $entry->assetDownload[0]->photoCredit,
                    ];
                }

                // Content Block(contentBlock MATRIX)
                $contentBlocks = [];
                foreach ($entry->contentBlock->all() as $block) {

                    switch ($block->type->handle) {

                        case 'heading':
                            // (heading TEXT)

                            $contentBlocks[] = [
                                'heading' => $block->heading,
                            ];
                            break;

                        case 'subheading':
                            // (subheading TEXT)

                            $contentBlocks[] = [
                                'subheading' => $block->subheading,
                            ];
                            break;

                        case 'image':
                            // (image ASSET)
                            // (imagePosition DROPDOWN)

                            $image = [];
                            if (isset($block->image[0])) {
                                $image=[
                                    'image' => $block->image[0]->url,
                                    'photoCredit' => $block->image[0]->photoCredit,
                                ];
                            }

                            $contentBlocks[] = [
                                'image' => [
                                    'image' => $image,
                                    'imagePosition' => $block->imagePosition->value,
                                ],
                            ];
                            break;

                        case 'body':
                            // (body REDACTOR)

                            $body = (string) $block->body;
                            // $body = str_replace('<script', '<figure><script', $body);
                            // $body = str_replace('</script>', '</script></figure>', $body);

                            $contentBlocks[] = [
                                'body' => $body,
                            ];
                            break;

                        case 'singleSlider':
                            // (slideHeadline TEXT)
                            // (slideImageLeftBackground ASSSET)
                            // (slideSummary TEXT)
                            // (slideButtonText TEXT)
                            // (slideUrlOverride TEXT)

                            $slideImageLeftBackground = [];
                            if (isset($block->slideImageLeftBackground[0])) {
                                $slideImageLeftBackground=[
                                    'image' => $block->slideImageLeftBackground[0]->url,
                                    'photoCredit' => $block->slideImageLeftBackground[0]->photoCredit,
                                ];
                            }

                            $contentBlocks[] = [
                                'singleSlider' => [
                                    'slideHeadline' => $block->slideHeadline,
                                    'slideImageLeftBackground' => $slideImageLeftBackground,
                                    'slideSummary' => $block->slideSummary,
                                    'slideButtonText' => $block->slideButtonText,
                                    'slideUrlOverride' => $block->slideUrlOverride,
                                ],
                            ];
                            break;

                        case 'button':
                            // (buttonText TEXT)
                            // (buttonUrl TEXT)
                            // (buttonColor DROPDOWN)

                            $contentBlocks[] = [
                                'button' => [
                                    'buttonText' => $block->buttonText,
                                    'buttonUrl' => $block->buttonUrl,
                                    'buttonColor' => $block->buttonColor->value,
                                ],
                            ];
                            break;

                        case 'callout':
                            // (calloutText TEXT)
                            // (greyCalloutBox LIGHTSWITCH)

                            $contentBlocks[] = [
                                'callout' => [
                                    'calloutText' => $block->calloutText,
                                    'greyCalloutBox' => (bool) $block->greyCalloutBox,
                                ],
                            ];
                            break;

                        case 'richTextCallout':
                            // (richTextCallout REDACTOR)
                            // (greyCalloutBox LIGHTSWITCH)

                            $richTextCallout = (string) $block->richTextCallout;
                            // $richTextCallout = str_replace('<script', '<figure><script', $richTextCallout);
                            // $richTextCallout = str_replace('</script>', '</script></figure>', $richTextCallout);

                            $contentBlocks[] = [
                                'richTextCallout' => [
                                    'richTextCallout' => $richTextCallout,
                                    'greyCalloutBox' => (bool) $block->greyCalloutBox,
                                ],
                            ];
                            break;

                        case 'twoColumns':
                            // (leftColumn REDACTOR)
                            // (rightColumn REDACTOR)

                            $leftColumn = (string) $block->leftColumn;
                            // $leftColumn = str_replace('<script', '<figure><script', $leftColumn);
                            // $leftColumn = str_replace('</script>', '</script></figure>', $leftColumn);

                            $rightColumn = (string) $block->rightColumn;
                            // $rightColumn = str_replace('<script', '<figure><script', $rightColumn);
                            // $rightColumn = str_replace('</script>', '</script></figure>', $rightColumn);

                            $contentBlocks[] = [
                                'twoColumns' => [
                                    'leftColumn' => $leftColumn,
                                    'rightColumn' => $rightColumn,
                                ],
                            ];
                            break;

                        case 'modalForm':
                            // (headline TEXT)
                            // (subtext TEXT)
                            // (leadSource TEXT)
                            // (buttonText TEXT)
                            // (delay TEXT)

                            $contentBlocks[] = [
                                'modalForm' => [
                                    'headline' => $block->headline,
                                    'subtext' => $block->subtext,
                                    'leadSource' => $block->leadSource,
                                    'buttonText' => $block->buttonText,
                                    'delay' => $block->delay,
                                ],
                            ];
                            break;

                        case 'modalLink':
                            // (headline TEXT)
                            // (subtext TEXT)
                            // (linkUrl TEXT)
                            // (buttonText TEXT)
                            // (delay NUMBER)

                            $contentBlocks[] = [
                                'modalLink' => [
                                    'headline' => $block->headline,
                                    'subtext' => $block->subtext,
                                    'linkUrl' => $block->linkUrl,
                                    'buttonText' => $block->buttonText,
                                    'delay' => $block->delay,
                                ],
                            ];
                            break;

                    }

                }

                // Resources(resources ENTRIES)
                $tagsOutput = [];
                foreach ($entry->tags->all() as $tags) {
                    $tagsOutput[] = $tags->title;
                }

                // Header Image(headerImage ASSET),
                // Grid Image(gridImage ASSETS),
                // Body(body REDACTOR),
                // Summary(summary TEXT),
                // Content Block (contentBlock MATRIX),
                // URL Override(urlOverride TEXT)
                // Asset Download(assetDownload ASSET)
                // Tags(tags TAGS),

                $entryBody = (string) $entry->body;
                // $entryBody = str_replace('<script', '<figure><script', $entryBody);
                // $entryBody = str_replace('</script>', '</script></figure>', $entryBody);

                $optimizedTitle = $entry->seoElementMetadata->optimizedTitle;
                $optimizedDescription = $entry->seoElementMetadata->optimizedDescription;
                $optimizedImage = "";
                if ($entry->seoElementMetadata->optimizedImage != "") {
                    $optimizedImage = Asset::find()
                        ->id($entry->seoElementMetadata->optimizedImage)
                        ->one()
                        ->url;
                }
                $optimizedKeywords = $entry->seoElementMetadata->optimizedKeywords;
                $canonical = $entry->seoElementMetadata->canonical;

                return [
                    'title' => $entry->title,
                    'id' => $entry->id,
                    'slug' => $entry->slug,
                    'author' => $entry->author->username,
                    'url' => $entry->getUrl(),
                    'postDate' => $entry->postDate ? $entry->postDate->format(\DateTime::ATOM) : null,
                    'expireDate' => $entry->expiryDate ? $entry->expiryDate->format(\DateTime::ATOM) : null,
                    'status' => (bool) $entry->enabled,
                    'type' => $entry->type->handle,

                    'headerImage' => $headerImage,
                    'gridImage' => $gridImage,
                    'body' => $entryBody,
                    'summary' => $entry->summary,
                    'contentBlocks' => $contentBlocks,
                    'urlOverride' => $entry->urlOverride,
                    'assetDownload' => $assetDownload,
                    'tags' => $tagsOutput,
                    'seoElementMetadata' => [
                        'optimizedTitle' => $optimizedTitle,
                        'optimizedDescription' => $optimizedDescription,
                        'optimizedImage' => $optimizedImage,
                        'optimizedKeywords' => $optimizedKeywords,
                        'canonical' => $canonical,
                    ],
                ];
            }
        ]; }
    ]
];
