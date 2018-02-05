export function getUserInfo(data, provider) {
  let fullName = null;
  let avatar = null;

  if (provider === "google") {
  } else {
    fullName = data.name;
    avatar = data.picture.data.url;
  }

  return {
    fullName,
    avatar,
    email: data.email,
    providerData: {
      uid: data.id,
      provider: provider
    }
  };
}
