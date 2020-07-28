export const ChangePhoneFormat = (phoneNumber) =>{
    const p = phoneNumber.split(")");

    const p1 = p[0].substr(p.length - 1);

    const p2 = p[1] && p[1].split("-");
    
    return p2 ? `+91 ${p1}${p2[0]}${p2[1]}` : `+91 ${p}`;
  };