export default payload => {
  try {
    return JSON.parse(payload);
  } catch (err) {
    console.error('[Dimmer Dialog] Unable to parse JSON payload');
    return null;
  }
};
