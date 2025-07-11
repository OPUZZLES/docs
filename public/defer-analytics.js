// Defer analytics loading until user interaction
let analyticsLoaded = false;

function loadAnalytics() {
  if (analyticsLoaded) return;
  analyticsLoaded = true;

  // Load Google Tag Manager
  const gtmScript = document.createElement('script');
  gtmScript.async = true;
  gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-5JZMJ5RB';
  document.head.appendChild(gtmScript);

  // Load PostHog
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init('phc_TSFbhAvn2aTODD9RjuB1ULGV4idHgfcqoo6xEhKTcQ',{api_host:'https://eu.i.posthog.com'});
}

// Load analytics on first user interaction
const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
let triggered = false;

function triggerAnalytics() {
  if (triggered) return;
  triggered = true;
  
  // Remove listeners
  events.forEach(event => {
    document.removeEventListener(event, triggerAnalytics, { passive: true });
  });
  
  // Load analytics after a short delay
  setTimeout(loadAnalytics, 100);
}

// Add listeners
events.forEach(event => {
  document.addEventListener(event, triggerAnalytics, { passive: true });
});

// Also load after 5 seconds if no interaction
setTimeout(() => {
  if (!triggered) {
    triggerAnalytics();
  }
}, 5000);