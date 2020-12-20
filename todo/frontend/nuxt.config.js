export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Global CSS
   */
  css: ["@/assets/css/main.css"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    "@/plugins/axios",
    { src: "~/plugins/validation.js", ssr: false }
    // { src: '~/plugins/argon', ssr: false },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    [
      "bootstrap-vue/nuxt",
      {
        icons: true
      }
    ],
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/toast",
    "nuxt-material-design-icons",
    "@neneos/nuxt-animate.css"
    // 'nuxtjs-argon',
  ],
  toast: {
    position: "top-center",
    register: [
      // Register custom toasts
      {
        name: "my_error",
        message: message => message,
        options: {
          type: "error",
          icon: "error_outline",
          theme: "bubble",
          duration: 2000
          // action: {
          //     icon: 'clear',
          //     onClick: (e, toastObject) => {
          //         toastObject.goAway(0);
          //     }
          // },
        }
      },
      {
        name: "successful",
        message: message => message,
        options: {
          type: "success",
          icon: "done",
          theme: "bubble",
          duration: 2000
          // action: {
          //     icon: 'clear',
          //     onClick: (e, toastObject) => {
          //         toastObject.goAway(0);
          //     }
          // },
        }
      }
    ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: "http://127.0.0.1:8000/api" // Used as fallback if no runtime config is provided
  },
  loading: {
    color: "#648d2e",
    height: "3px"
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {}
};
