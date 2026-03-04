exports.handler = async function () {
  try {
    const token = process.env.NETLIFY_TOKEN;
    const siteId = process.env.NETLIFY_SITE_ID;

    // 1️⃣ 获取所有 forms
    const formsResponse = await fetch(
      `https://api.netlify.com/api/v1/sites/${siteId}/forms`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const forms = await formsResponse.json();

    // 2️⃣ 找到 aroma 表单
    const aromaForm = forms.find(form => form.name === "aroma");

    if (!aromaForm) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Aroma form not found" }),
      };
    }

    // 3️⃣ 获取该表单的 submissions
    const submissionsResponse = await fetch(
      `https://api.netlify.com/api/v1/forms/${aromaForm.id}/submissions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const submissions = await submissionsResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify(submissions),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
