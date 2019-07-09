import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

// import '../css/blog-post.css';

export default function Template({ data }) {
 const {gcms} = data
  return (
    <div className="blog-post-container">
      <Helmet title={`Your Blog Name - ${gcms.walk.name}`} />
      <div className="blog-post">
        <h1>{gcms.walk.name}</h1>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
query WalkQuery($slug: String!) {
    gcms {
      walk(where: {
        slug: $slug
      }) {
        name
      }
    }
  }
`