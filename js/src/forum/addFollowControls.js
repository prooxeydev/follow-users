import { extend } from 'flarum/extend';
import Model from 'flarum/Model';
import UserControls from 'flarum/utils/UserControls';
import Button from 'flarum/components/Button';

export default () => {
    // app.store.models.tags.prototype.subscription = Model.attribute('subscription');
    extend(UserControls, 'userControls', function(items, user) {
        if (app.session.user === user || !app.session.user) {
            return;
        }

        function unfollow() {
            if (confirm(app.translator.trans(`simonxeko-follow-users.forum.user_controls.unfollow_confirmation`))) {
                this.save({followed: false});
            }
        }

        function follow() {
            if (confirm(app.translator.trans(`simonxeko-follow-users.forum.user_controls.follow_confirmation`))) {
                this.save({followed: true});
            }
        }

        if (user.followed()) {
            items.add('unfollow', Button.component({
                icon: 'fas fa-user-slash',
                children: app.translator.trans('simonxeko-follow-users.forum.user_controls.unfollow_button'),
                onclick: unfollow.bind(user),
            }));
        } else {
            items.add('follow', Button.component({
                icon: 'fas fa-user',
                children: app.translator.trans('simonxeko-follow-users.forum.user_controls.follow_button'),
                onclick: follow.bind(user),
            }));
        }
    });
};