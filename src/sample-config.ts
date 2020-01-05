// TODO: Copy this file and rename it to 'config.ts'.

const local = {
  // Base URL for API calls
  API_BASE_URL: 'TODO',
};

const config = local; // process.env.NODE_ENV === "prod" ? prod : dev;

export default {
  ...config,

  // Mapbox key access token
  MAPBOX_KEY_ACCESS_TOKEN: 'TODO',
};
