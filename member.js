function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'modules/skills/views/member.html',
        controller: 'SkillsMemberController',
        controllerAs: 'SkillsMemberCtrl',
        bindToController: true,
        scope: {
            member: '='
        }
    };
}