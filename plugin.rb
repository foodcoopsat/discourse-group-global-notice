# frozen_string_literal: true

# name: discourse-group-global-notice
# about: Global Notices for Groups
# version: 0.1.0
# authors: Patrick Gansterer
# url: https://github.com/foodcoopsat/discourse-group-global-notice
# required_version: 2.7.0

enabled_site_setting :discourse_group_global_notice_enabled

module ::DiscourseGroupGlobalNotice
  PLUGIN_NAME = "discourse-group-global-notice"
end

require_relative "lib/discourse_group_global_notice/engine"

after_initialize do
  add_to_serializer(:current_user, :global_notices) do
    GroupCustomField
      .includes(group: :group_users)
      .where(name: "global_notice")
      .where(groups: { group_users: { user: self.id } })
      .pluck(:value)
      .map { |n| JSON.parse(n) }
  end
end
