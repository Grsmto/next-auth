/**
 * <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
 * <span style={{fontSize: "1.35rem" }}>
 *  Built-in sign in with <b>Apple</b> integration.
 * </span>
 * <a href="https://apple.com" style={{backgroundColor: "black", padding: "12px", borderRadius: "100%" }}>
 *   <img style={{display: "block"}} src="https://authjs.dev/img/providers/apple-dark.svg" width="24"/>
 * </a>
 * </div>
 *
 * @module providers/apple
 */

import type { OIDCConfig, OIDCUserConfig } from "./index.js"

/** The returned user profile from Hugging Face when using the profile callback. */
export interface HuggingFaceProfile extends Record<string, any> {
  /**
   * The subject registered claim identifies the principal that's the subject of the identity token.
   * Since this token is meant for your application, the value is the unique identifier for the user.
   */
  sub: string

  /**
   * A String value representing the user's email address.
   * The email address is either the user's real email address or the proxy address,
   * depending on their status private email relay service.
   */
  email: string

  /**
   * A String value representing the user's preferred username.
   */
  preferred_username: string

  /**
   * A String value representing the user's name.
   */
  name: string

  /**
   * A URL string pointing to the user's profile picture on huggingface.co.
   */
  picture: string
}

/**
 * ### Setup
 *
 * #### Callback URL
 * ```
 * https://example.com/api/auth/callback/hugging-face
 * ```
 *
 * #### Configuration
 *
 * Import the provider and configure it in your **Auth.js** initialization file:
 *
 * ```ts title="pages/api/auth/[...auth].ts"
 * import Auth from "@auth/core";
 * import HuggingFaceProvider from "next-auth/providers/hugging-face";
 *
 * export default NextAuth({
 *   providers: [
 *     HuggingFaceProvider({
 *       clientId: process.env.HF_CLIENT_ID,
 *       clientSecret: process.env.HF_CLIENT_SECRET,
 *     }),
 *   ],
 * })
 * ```
 * 
 * ### Resources
 * 
 * - [Learn more about OAuth](https://authjs.dev/concepts/oauth)

 * ### Notes
 * 
 * The Hugging Face provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/huggingface.ts). To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/providers/custom-provider#override-default-options).
 *
 * ## Help
 *
 * If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).
 *
 * Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
 * the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
 * we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).
 */
export default function HuggingFace(
  config: OIDCUserConfig<HuggingFaceProfile>
): OIDCConfig<HuggingFaceProfile> {
  return {
    id: "huggingface",
    name: "Hugging Face",
    type: "oidc",
    issuer: "https://huggingface.co",
    authorization: {
      params: { scope: "openid profile" },
    },
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.preferred_username,
        email: profile.email,
        image: profile.picture,
      }
    },
    style: {
      logo: "/huggingface.svg",
      logoDark: "/huggingface.svg",
      bg: "#fff",
      text: "#000",
      bgDark: "#000",
      textDark: "#fff",
    },
    options: config,
  }
}
