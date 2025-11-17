
export const cookieOptions = {
  httpOnly: true,
  secure: true,         
  sameSite: "none",    
  path: "/",            
  maxAge: 1000 * 60 * 60, // 1 hour
};
