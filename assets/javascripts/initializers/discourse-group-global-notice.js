import { withPluginApi } from "discourse/lib/plugin-api";

function initializeDiscourseGroupGlobalNotice(api) {
  const currentUser = api.getCurrentUser();

  if (currentUser) {
    currentUser.global_notices.forEach((notice) => {
      api.addGlobalNotice(
        notice.text,
        notice.id,
        {
          dismissable: notice.dismissable,
          level: notice.level,
          persistentDismiss: notice.persistent_dismiss,
          visibility: notice.visibility,
          dismissDuration: notice.dismiss_duration
            ? moment.duration(notice.dismiss_duration, "seconds")
            : undefined,
        }
      );
    })
  }
}

export default {
  name: "discourse-group-global-notice",

  initialize() {
    withPluginApi("0.8.31", initializeDiscourseGroupGlobalNotice);
  }
};
