// Import got package so you can get data from the URL
import got from 'got';

// Base URL to get the JSON data from WordPress REST API for Distros
const distroURL = "https://dev-cs5513-database.pantheonsite.io/wp-json/wp/v2/distro";

// URL for Package Managers
const packageManagerURL = "https://dev-cs5513-database.pantheonsite.io/wp-json/wp/v2/package-manager";

// URL for Desktop Environments
const desktopEnvironmentURL = "https://dev-cs5513-database.pantheonsite.io/wp-json/wp/v2/desktop-environment";


// --- Helper Function to Fetch and Parse JSON Data ---

/**
 * Fetches and parses JSON data from a given URL.
 * Handles fetch and parse errors gracefully, returning an empty array on failure.
 * @param {string} url The URL to fetch data from.
 * @returns {Array} The parsed JSON object array or an empty array on error.
 */

async function fetchAndParseJson(url) {
    let jsonString;
    try {
        jsonString = await got(url);
    } catch (error) {
        // on error, fall back to an empty array JSON string so JSON.parse won't throw
        console.error(`Failed to fetch posts JSON from ${url}:`, error.message || error);
        jsonString = { body: '[]' };
    }

    let jsonObj;
    try {
        jsonObj = JSON.parse(jsonString.body);
    } catch (err) {
        // On error, fall back to an empty array so the rest of the code can run
        console.error(`Failed to parse posts JSON from ${url}:`, err.message || err);
        jsonObj = [];
    }
    return jsonObj;
}

// DISTRO FUNCTIONS

// Function to get all post IDs from the JSON data
export async function getAllPostIds() {
    const jsonObj = await fetchAndParseJson(distroURL);

    // Writes out the objects in the JSON array to terminal
    console.log(jsonObj);

    // Give us the output from the mapping of the array
    return jsonObj.map(item => {
        return {
            params: {
                id: item.id.toString()
            }
        }
    });
}

// Function to get sorted posts data from the JSON data
export async function getSortedPostsData() {
    const jsonObj = await fetchAndParseJson(distroURL);

    // Sort by the ACF field 'distro_name'
    jsonObj.sort(function (a, b) {
        return a.acf.distro_name.localeCompare(b.acf.distro_name);
    });

    // Extract the requested fields
    return jsonObj.map(item => {
        return {
            id: item.id.toString(),
            distro_name: item.acf.distro_name,
            description: item.acf.description,
            development_country: item.acf.development_country,
            original_developers: item.acf.original_developers,
        }
    });
}

// Function to get post data for a given id from the JSON data
export async function getPostData(id) {
    const jsonObj = await fetchAndParseJson(distroURL);

    // Filter the JSON data to find the object with the matching id
    const objReturned = jsonObj.filter(obj => {
        return obj.id.toString() === id;
    });

    // If no object is found, return a simple 'Not found' object
    if (objReturned.length === 0) {
        return {
            id: id,
            distro_name: 'Not found',
        }
    } else {
        const item = objReturned[0];
        // Return a mapped object with the specific fields
        return {
            id: item.id.toString(),
            distro_name: item.acf.distro_name,
            description: item.acf.description,
            development_country: item.acf.development_country,
            original_developers: item.acf.original_developers,
        };
    }
}

// PACKAGE MANAGER FUNCTIONS

// Function to get all post IDs for package managers
export async function getAllPackageManagerPostIds() {
    const jsonObj = await fetchAndParseJson(packageManagerURL);

    return jsonObj.map(item => {
        return {
            params: {
                id: item.id.toString()
            }
        }
    });
}

// Function to get sorted package manager data
export async function getSortedPackageManagerData() {
    const jsonObj = await fetchAndParseJson(packageManagerURL);

    // Sort by the ACF field 'pm_name'
    jsonObj.sort(function (a, b) {
        return a.acf.pm_name.localeCompare(b.acf.pm_name);
    });

    // Extract the requested fields
    return jsonObj.map(item => {
        return {
            id: item.id.toString(),
            pm_name: item.acf.pm_name,
            pm_content: item.acf.pm_content,
            pm_url: item.acf.pm_url,
            pm_release_date: item.acf.pm_release_date,
        }
    });
}

// Function to get package manager post data for a given id
export async function getPackageManagerPostData(id) {
    const jsonObj = await fetchAndParseJson(packageManagerURL);

    const objReturned = jsonObj.filter(obj => {
        return obj.id.toString() === id;
    });

    if (objReturned.length === 0) {
        return {
            id: id,
            pm_name: 'Not found',
        }
    } else {
        const item = objReturned[0];
        // Return a mapped object with the specific fields
        return {
            id: item.id.toString(),
            pm_name: item.acf.pm_name,
            pm_content: item.acf.pm_content,
            pm_url: item.acf.pm_url,
            pm_release_date: item.acf.pm_release_date,
        }
    }
}

// DESKTOP ENVIRONMENT FUNCTIONS

// Function to get all post IDs for desktop environments
export async function getAllDesktopEnvironmentPostIds() {
    const jsonObj = await fetchAndParseJson(desktopEnvironmentURL);

    return jsonObj.map(item => {
        return {
            params: {
                id: item.id.toString()
            }
        }
    });
}

// Function to get sorted desktop environment data
export async function getSortedDesktopEnvironmentData() {
    const jsonObj = await fetchAndParseJson(desktopEnvironmentURL);

    // Sort by the ACF field 'de_name'
    jsonObj.sort(function (a, b) {
        return a.acf.de_name.localeCompare(b.acf.de_name);
    });

    // Extract the requested fields
    return jsonObj.map(item => {
        return {
            id: item.id.toString(),
            de_name: item.acf.de_name,
            de_content: item.acf.de_content,
            de_release_year: item.acf.de_release_year,
            de_url: item.acf.de_url,
        }
    });
}

// Function to get desktop environment post data for a given id
export async function getDesktopEnvironmentPostData(id) {
    const jsonObj = await fetchAndParseJson(desktopEnvironmentURL);

    const objReturned = jsonObj.filter(obj => {
        return obj.id.toString() === id;
    });

    if (objReturned.length === 0) {
        return {
            id: id,
            de_name: 'Not found',
        }
    } else {
        const item = objReturned[0];
        // Return a mapped object with the specific fields
        return {
            id: item.id.toString(),
            de_name: item.acf.de_name,
            de_content: item.acf.de_content,
            de_release_year: item.acf.de_release_year,
            de_url: item.acf.de_url,
        }
    }
}