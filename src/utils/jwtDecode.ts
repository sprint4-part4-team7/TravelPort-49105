interface JwtPayload {
  id: number;
  email: string;
  name: string;
  isPartner: number;
}

const jwtDecode = (token: string): JwtPayload => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        .join(''),
    );
    const userData = JSON.parse(jsonPayload);
    delete userData.iat;
    delete userData.exp;
    return userData;
  } catch (e) {
    throw new Error('Invalid JWT token');
  }
};

export default jwtDecode;
