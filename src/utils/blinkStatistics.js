// 1. Calculate average blinks per minute
function averageBlinksPerMinute(blinkData) {
    if (blinkData === 0) {
        return 0;
    }
    
    const timestamps = blinkData.map(item => new Date(item[1]));

    if (timestamps.length < 2) {
        return 0;
    }

    const duration = (timestamps[timestamps.length - 1] - timestamps[0]) / 60000; // Convert to minutes
    const avgBlinksPerMinute = Math.round(timestamps.length / duration);
    return avgBlinksPerMinute;
}

// 2. Calculate the longest interval without blinking
function longestIntervalWithoutBlinking(blinkData) {
    if (blinkData === 0 || blinkData.length < 2) {
        return "0:00";
    }
    
    const timestamps = blinkData.map(item => new Date(item[1]));

    let intervals = [];
    for (let i = 0; i < timestamps.length - 1; i++) {
        intervals.push((timestamps[i + 1] - timestamps[i]) / 1000); // Convert to seconds
    }
    const longestInterval = Math.max(...intervals, 0); // Ensure 0 is the minimum value

    // Convert to mm:ss format
    const minutes = Math.floor(longestInterval / 60);
    const seconds = Math.floor(longestInterval % 60);
    const formattedInterval = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return formattedInterval;
}

// 3. Calculate the maximum blinks in a one-minute window
function maxBlinksInOneMinute(blinkData) {
    if (blinkData === 0) {
        return 0;
    }
    
    const timestamps = blinkData.map(item => new Date(item[1]));

    let maxBlinks = 0;
    for (let i = 0; i < timestamps.length; i++) {
        const startTime = timestamps[i];
        const endTime = new Date(startTime.getTime() + 60000); // Add one minute
        const countBlinks = timestamps.filter(ts => ts >= startTime && ts < endTime).length;
        maxBlinks = Math.max(maxBlinks, countBlinks);
    }
    return maxBlinks;
}

export { averageBlinksPerMinute, longestIntervalWithoutBlinking, maxBlinksInOneMinute };
