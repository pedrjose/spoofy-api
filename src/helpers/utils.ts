export const env = (key: string, defaultValue: string | number | boolean | null = null) => {
    const value = process.env[key];
  
    if (value === "true") 
        return true;

    if (value === "false")
        return false;

    if (value === "(empty)")
         return "";

    return value || defaultValue;
  };