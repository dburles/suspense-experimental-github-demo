import { fetchUser } from "./api";
import prepareUserPageStars from "./UserPageStars.data";
import prepareUserPageFollowing from "./UserPageFollowing.data";
import dataCache from "./dataCache";

// Data dependencies are a separate file tree colocated with the component tree.
// Tools like Relay automate creating these files, but here we'll do it by hand.
//
// We put it into another file so that we can load the data dependencies
// *without* any of the UI code for the corresponding screen. This lets
// us kick off a fetch early (e.g. on navigation) before UI code is loaded.
// You can verify this happens by enabling "Slow 3G" in Chrome Network pane
// and see the bundle and data requests go out in parallel.

export default function prepareUserPage(userId) {
  const user = dataCache.load(["fetchUser", userId], fetchUser);
  const { stars } = prepareUserPageStars(userId);
  const { following } = prepareUserPageFollowing(userId);

  return { user, stars, following };
}
