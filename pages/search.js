import { useState, useEffect } from 'react'
import Layout from '../components/Layout'

export default function search() {

  useEffect(() => {
  document.getElementById("search-product").focus();
  }, []);

  return (
    <Layout title="Ecommerce - search">
      <h1>search...</h1>
    </Layout>
  )
}
