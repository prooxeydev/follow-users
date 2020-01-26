/*
 *
 *  This file is part of fof/ignore-users.
 *
 *  Copyright (c) 2019 FriendsOfFlarum..
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 *
 */

import avatar from 'flarum/helpers/avatar';
import Button from 'flarum/components/Button';
import username from 'flarum/helpers/username';
import UserPage from 'flarum/components/UserPage';

export default class ProfilePage extends UserPage {
    init() {
        super.init();

        this.loading = true;

        this.followedUsers = app.session.user.followedUsers();

        this.loadUser(app.session.user.username())
    }

    content() {
        return (
            <table className="NotificationGrid">
                {this.followedUsers.map((user, i) => {
                    var unfollow = () => {
                        if (confirm(app.translator.trans(`simonxeko-follow-users.forum.user_controls.unfollow_confirmation`))) {
                            user.save({followed: false});
                            this.followedUsers.splice(i, 1);
                            app.session.user.followedUsers = m.prop(this.followedUsers)
                        }
                    }

                    return (
                        <tr>
                            <td>
                                <a href={app.route.user(user)} config={m.route}>
                                    <h3>{avatar(user, {className: 'followPage-avatar'})} {username(user)}</h3>
                                </a>
                            </td>
                            <td className="followPage-button">
                                {Button.component({
                                    icon: 'fas fa-comment-slash',
                                    type: 'button',
                                    className: 'Button Button--warning',
                                    children: app.translator.trans('simonxeko-follow-users.forum.user_controls.unfollow_button'),
                                    onclick: unfollow.bind(user),
                                })}
                            </td>
                        </tr>
                    )
                })}
            </table>
        )
    }

    show(user) {
        this.user = app.session.user;

        m.redraw();
    }
}