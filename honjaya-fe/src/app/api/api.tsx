const baseURL = "/api";

// GET 요청 함수
export const getData = async (endpoint: string) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }), // 토큰이 있을 경우 헤더에 추가
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch data from ${endpoint}:`, error);
    throw error;
  }
};

// // POST 요청 함수
// export const postData = async ({endpoint, data) => {
//   try {
//     const token = localStorage.getItem("access_token");
//     const response = await fetch(`${baseURL}${endpoint}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         ...(token && { "Authorization": `Bearer ${token}` }), // 토큰이 있을 경우 헤더에 추가
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to post data to ${endpoint}: ${response.statusText}`);
//     }

//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     console.error(`Failed to post data to ${endpoint}:`, error);
//     throw error;
//   }
// };

export default getData;
