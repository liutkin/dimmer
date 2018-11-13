export default payload => {
  try {
    return JSON.parse(payload);
  } catch (err) {
    console.error('[Dimmer Dialog] Payload should be valid JSON');
    return null;
  }
};
