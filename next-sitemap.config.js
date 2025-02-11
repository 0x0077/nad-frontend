const excludedPaths = ["/blockchain", "/utils"];

module.exports = {
  siteUrl: "https://nad.finance", 
  generateRobotsTxt: true, 
  exclude: excludedPaths.concat(["/[sitemap]"]), 
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: excludedPaths, 
      },
    ],
  },
};