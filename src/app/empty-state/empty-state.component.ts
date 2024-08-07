import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-empty-state',
    templateUrl: './empty-state.component.html',
    styleUrls: ['./empty-state.component.css'],
})
export class EmptyStateComponent {
    @Input() text!: string;
    @Input() icon!: string;
    @Input() showRefreshButton!: boolean;

    reloadApp() {
        window.location.reload();
    }
}
