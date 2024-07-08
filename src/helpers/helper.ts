import { Alert } from 'react-native';

 // const API_URL = "https://expo-stripe-server-example.glitch.me"
    const API_URL = "https://cupmakes.onrender.com"

export async function fetchPublishableKey(
  paymentMethod?: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `${API_URL}/stripe-key?paymentMethod=${paymentMethod}`
    );

    const { publishableKey } = await response.json();
console.log('publicKey'+publishableKey)
    return publishableKey;
  } catch (e) {
    console.warn('Unable to fetch publishable key. Is your server running?');
    Alert.alert(
      'Error',
      'Unable to fetch publishable key. Is your server running?'
    );
    return null;
  }
}
