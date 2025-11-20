
// Import got package so you can get data from the URL
import got from 'got';

/* URL to get the JSON data from WordPress REST API
For this week assignment I went with Option 3 that didn't involve using 
custom php and $wpdb to retrieve data form the custom fields and posts. Instead I 
enabled the custom REST API in the administrative UI for ACF plug-in */
const dataURL = "https://dev-cs5513-database.pantheonsite.io/wp-json/wp/v2/distro";

// Function to get all post IDs from the JSON data
export async function getAllPostIds() {
    // Fetch the JSON data from the URL
    let jsonString;
    try {
        jsonString = await got(dataURL);
    
    } catch(error) {
        // on error, fall back to an empty array JSON string so JSON.parse won't throw
        console.error('Failed to fetch posts JSON:', error.message || error);
        jsonString = { body: '[]' };
    }
    // Parse the JSON data
    let jsonObj;
    try {
        jsonObj = JSON.parse(jsonString.body);
    } catch (err) {
        // On error, fall back to an empty array so the rest of the code can run
        console.error('Failed to parse posts JSON:', err.message || err);
        jsonObj = [];
    }
    // Writes  out the objects in the JSON array to temrinal
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
    
    let jsonString;
    try {
        jsonString = await got(dataURL);
        // console.log(jsonString.body)
    } catch(error) {
        console.error('Failed to fetch posts JSON:', error.message || error);
        jsonString = { body: '[]' };
    }

    let jsonObj;
    try {
        jsonObj = JSON.parse(jsonString.body);
    } catch (err) {
        console.error('Failed to parse posts JSON:', err.message || err);
        jsonObj = [];
    }

    jsonObj.sort(function (a, b) {
        return a.acf.distro_name.localeCompare(b.acf.distro_name);
    });

    // Give us the output from the mapping of the array
    return jsonObj.map(item => {
        return {
            id: item.id.toString(),
            title: item.acf.distro_name,
            content: item.acf.description
        }
    });
}

// Function to get post data for a given id from the JSON data
export async function getPostData(id) {
    
    // Fetch the JSON data from the URL
    let jsonString;
    try {
        jsonString = await got(dataURL);
        // console.log(jsonString.body)
    } catch(error) {
        console.error('Failed to fetch posts JSON:', error.message || error);
        jsonString = { body: '[]' };
    }
    // Parse the JSON data
    let jsonObj;
    try {
        jsonObj = JSON.parse(jsonString.body);
    } catch (err) {
        console.error('Failed to parse posts JSON:', err.message || err);
        jsonObj = [];
    }
    
    // Filter the JSON data to find the object with the matching id
    const objReturned = jsonObj.filter(obj => {
    return obj.id.toString() === id;
    
    });
    // console.log(objReturned);

    // If statement gives a mesasge if the objects are not returned from JSON 
    if (objReturned.length === 0) {
        return {
            id: id,
            title: 'Not found',
            
        }
    } else {
        return objReturned[0];
    }
}