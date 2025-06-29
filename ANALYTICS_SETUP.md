# Analytics Setup Guide

This guide explains how to configure analytics for LaTeX Cloud Studio documentation.

## Required Analytics Tools

1. **Google Analytics 4 (GA4)** - Website traffic and user behavior
2. **Google Tag Manager (GTM)** - Tag management and event tracking
3. **Google Search Console (GSC)** - Search performance and indexing
4. **PostHog** - Product analytics and user insights

## Setup Instructions

### 1. Google Analytics 4 (GA4)

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property for `resources.latex-cloud-studio.com`
3. Copy the Measurement ID (format: `G-XXXXXXXXXX`)
4. Replace `G-XXXXXXXXXX` in `docs.json` with your actual Measurement ID

### 2. Google Tag Manager (GTM)

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Create a new container for `resources.latex-cloud-studio.com`
3. Copy the Container ID (format: `GTM-XXXXXXX`)
4. Replace `GTM-XXXXXXX` in `docs.json` with your actual Container ID
5. Configure GA4 tag in GTM using your GA4 Measurement ID

### 3. Google Search Console (GSC)

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property for `resources.latex-cloud-studio.com`
3. Choose "HTML tag" verification method
4. Copy the verification code (the content attribute value)
5. Replace the verification code in `docs.json`

### 4. PostHog

1. Go to [PostHog](https://app.posthog.com/) or your self-hosted instance
2. Create a new project for LaTeX Cloud Studio Docs
3. Copy the Project API Key (format: `phc_...`)
4. Replace the API key in `docs.json`
5. Update the API host if using self-hosted PostHog

## Event Tracking Setup

### GTM Configuration

Create these tags in Google Tag Manager:

#### Page Views
- Tag Type: GA4 Event
- Event Name: page_view
- Trigger: All Pages

#### Document Downloads
- Tag Type: GA4 Event  
- Event Name: file_download
- Trigger: Click - All Elements
- Condition: Click URL contains `.pdf`, `.tex`, `.zip`

#### External Links
- Tag Type: GA4 Event
- Event Name: click_external_link
- Trigger: Click - All Elements
- Condition: Click URL does not contain `latex-cloud-studio.com`

#### Search Usage
- Tag Type: GA4 Event
- Event Name: search
- Trigger: Custom Event
- Event: site_search

### PostHog Events

PostHog will automatically track:
- Page views
- User sessions
- Feature usage
- Error tracking

Additional custom events can be added via the PostHog JavaScript SDK.

## Configuration Files

The analytics configuration is stored in `docs.json`:

```json
{
  "analytics": {
    "gtm": {
      "tagId": "GTM-XXXXXXX"
    },
    "ga4": {
      "measurementId": "G-XXXXXXXXXX"
    },
    "posthog": {
      "apiKey": "phc_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "apiHost": "https://app.posthog.com"
    }
  },
  "integrations": {
    "googleSearchConsole": {
      "verification": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    }
  }
}
```

## Privacy Compliance

- All analytics tools are configured to respect user privacy
- Cookie consent is handled by Mintlify's built-in consent management
- IP addresses are anonymized in GA4
- PostHog can be configured for GDPR compliance

## Testing

After setup:

1. **GA4**: Check Real-time reports for traffic
2. **GTM**: Use Preview mode to test tag firing
3. **GSC**: Verify domain ownership in Search Console
4. **PostHog**: Check the Live Events tab for incoming data

## Troubleshooting

### Common Issues

- **GTM not loading**: Check container ID format
- **GA4 not tracking**: Verify Measurement ID and GTM configuration
- **GSC verification failed**: Ensure verification meta tag is in HTML head
- **PostHog not working**: Check API key and host URL

### Debug Mode

Enable debug mode in browsers to see analytics events:
- GTM: Use Preview mode
- GA4: Install GA4 Debug extension
- PostHog: Check browser console for PostHog logs