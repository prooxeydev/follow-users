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

import {extend} from 'flarum/extend';
import app from 'flarum/app';
import LinkButton from 'flarum/components/LinkButton';
import UserPage from 'flarum/components/UserPage';

export default function () {
    extend(UserPage.prototype, 'navItems', function (items) {
        if (app.session.user && app.session.user === this.user)
        items.add('followed-users',
            LinkButton.component({
                href: app.route('followedUsers'),
                children: app.translator.trans('simonxeko-follow-users.forum.profile_link'),
                icon: 'fas fa-user',
            }),
        );
    });
}