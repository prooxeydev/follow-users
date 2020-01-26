import { extend } from 'flarum/extend';
import NotificationGrid from 'flarum/components/NotificationGrid';

import Model from 'flarum/Model';
import User from 'flarum/models/User';
import addFollowControls from './addFollowControls';
import addProfilePage from './addProfilePage';
import ProfilePage from './components/ProfilePage';
import NewDiscussionNotification from './components/NewDiscussionNotification';
import NewPostNotification from './components/NewPostNotification';

app.initializers.add(
    'simonxeko/follow-users',
    () => {
        User.prototype.followed = Model.attribute('followed');
        User.prototype.followedUsers = Model.hasMany('followedUsers');

        app.routes.followedUsers = {path: '/followedUsers', component: ProfilePage.component()};

        addFollowControls();
        addProfilePage();

        app.notificationComponents.newPostInTag = NewPostNotification;
        app.notificationComponents.newDiscussionInTag = NewDiscussionNotification;

        extend(NotificationGrid.prototype, 'notificationTypes', function(items) {
            items.add('newDiscussionInTag', {
                name: 'newDiscussionInTag',
                icon: 'fas fa-user-tag',
                label: app.translator.trans('simonxeko-follow-users.forum.settings.notify_new_discussion_label'),
            });

            items.add('newPostInTag', {
                name: 'newPostInTag',
                icon: 'fas fa-user-tag',
                label: app.translator.trans('simonxeko-follow-users.forum.settings.notify_new_post_label'),
            });
        });
    },
    -1
);
