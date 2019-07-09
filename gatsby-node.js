const path = require('path')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
  
    return new Promise((resolve, reject) => {
      const walkTemplate = path.resolve(`src/layouts/walkLayout.js`)
      // Query for markdown nodes to use in creating pages.
      resolve(
        graphql(
          `{
            gcms {
                walks {
                    slug
                }
            }
        }`
        ).then(result => {
          if (result.errors) {
            reject(result.errors)
          }
  
          // Create pages for each markdown file.
          result.data.gcms.walks.forEach(({ slug }) => {
            createPage({
              path: slug,
              component: walkTemplate,
              // In your blog post template's graphql query, you can use path
              // as a GraphQL variable to query for data from the markdown file.
              context: {
                slug,
              },
            })
          })
        })
      )
    })
  }

exports.createResolvers = ({ createResolvers }) => {
    const resolvers  = {
        GCMS_Walk: {
        mo_products: {
            type: ['MoltinProduct'], resolve: (source, args, context, info) => {
                return context.nodeModel.runQuery({
                    query: {
                        filter: {
                            sku: {
                                in: source.products
                            }
                        }
                    },
                    type: "MoltinProduct",
                    firstOnly: false
                })
            }
        }
    }
    }

    createResolvers(resolvers)
}