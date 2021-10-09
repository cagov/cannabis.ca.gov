// eleventyConfig.addCollection("posts", function(collection) {
//     let pressPosts = [];
//     // This is relative to `pages`
//     // @TODO What was the problem where we could not make the root in the wordpress folder? Is this tracked in an issue?
//     let folderNames = ['/wordpress/posts','/wordpress/pages'];
    
//     // For everything in posts, process the data object.
//     collection.getAll().forEach(item => {

//       if(item.inputPath.includes(folderNames[0]) || item.inputPath.includes(folderNames[1])) {
//         item.outputPath = 'docs/' + extractMeta.cleanUrl(item.data.data.wordpress_url) + 'index.html';

//         item.url = item.outputPath;
//         item.data.page.url = item.url;

//         //content pulled in from JSON
//         const jsonData = item.data.data;
//         item.data.layout = "layouts/index";
//         item.data.title = jsonData.title;
//         item.data.publishdate = jsonData.date.split('T')[0]; //new Date(jsonData.modified_gmt)
//         item.data.meta = jsonData.excerpt;
//         item.data.description = jsonData.excerpt;

//         item.data.description = extractMeta.getHeadTags(jsonData, "page_description");
//         if(!item.data.social) { item.data.social = {}; }
//         item.data.social.site_title = extractMeta.getHeadTags(jsonData, "site_title");
//         item.data.social.site_description = extractMeta.getHeadTags(jsonData, "site_description");
//         item.data.social.image = extractMeta.getHeadTags(jsonData, "image");
//         item.data.social.twitter_title = extractMeta.getHeadTags(jsonData, "twitter_title");
//         item.data.social.og_meta = extractMeta.getOGMetatags(jsonData);

//         item.data.lead = jsonData.excerpt;
//         item.data.author = jsonData.author;
//         item.data.templatestring = extractMeta.chooseTemplate(jsonData);
//         item.data.category = jsonData.category;
//         item.data.id = jsonData.id;
//         item.data.parentid = jsonData.parent;

//         if(jsonData.media) {
//           const featuredMedia = jsonData.media.find(x=>x.featured);
//           if(featuredMedia) {
//             item.data.previewimage = '/wp-content/uploads/'+featuredMedia.path;
//           }

//           jsonData.media.filter(x=>x.source_url_match).forEach(m=>{
//             // replaceContent(item,new RegExp(m.source_url,'g'),'/'+wordpressImagePath+'/'+m.path);
//             // item.template.frontMatter.content = item.template.frontMatter.content.replace(new RegExp(m.source_url,'g'),'/media/'+m.path);
//           });
//         }
//       };

//       if(item.data.data) {
//         if(item.data.data.type === "post" ) {
//           pressPosts.push(item);
//         }
//       }
//       // modify the wordpress asset links here opportunistically because we are already looping through tempaltes with njk transformed into HTML 
//       item.template.frontMatter.content = item.template.frontMatter.content.replace(new RegExp('http://cannabis.ca.gov/','g'),'/');
//       item.template.frontMatter.content = item.template.frontMatter.content.replace(new RegExp('https://cannabis.ca.gov/','g'),'/');
//     });
//     pressPosts.sort((a,b) => {
//       return new Date(b.data.data.date).getTime() - new Date(a.data.data.date).getTime();
//     });
//     return pressPosts;
//   });

//   eleventyConfig.addFilter("postlist", function(html) {
//     let myRe = /<cagov-post-list\s*.*>\s*.*<\/cagov-post-list>/gs;
//     let myArray = myRe.exec(html);
//     let lastPosts = lastFewPosts();
//     let postHTML = pressList(lastPosts, monthStrings);
//     if(myArray) {
//       return html.replace(myArray[0],postHTML);
//     }
//     return html;    
//   });

//   eleventyConfig.addFilter("eventlist", function(html) {
//     let myRe = /<cagov-event-post-list\s*.*>\s*.*<\/cagov-event-post-list>/gs;
//     let myArray = myRe.exec(html);
//     let lastPosts = lastFewPosts();
//     let postHTML = pressList(lastPosts, monthStrings);
//     if(myArray) {
//       return html.replace(myArray[0],postHTML);
//     }
//     return html;    
//   });