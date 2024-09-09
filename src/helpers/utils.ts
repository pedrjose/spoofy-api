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

export const convertTimeStrToMillisec = (timeString: string) =>
    timeString.match(/\d+\s?\w/g)?.reduce((acc, cur) => {
        let multiplier = 1000;

        const unit = cur.slice(-1);

        if (unit === "h") {
            multiplier *= 60 * 60;
        }

        if (unit === "m") {
            multiplier *= 60;
        }

        const curVal = parseInt(cur, 10);

        return curVal * multiplier + acc;
    }, 0) ?? 0;