import { extensions } from "vscode";
import TelemetryReporter from "vscode-extension-telemetry";

export class EventReporter {
    private reporter: TelemetryReporter;

    constructor() {
        const extension = extensions.getExtension("ryanluker.vscode-coverage-gutters")!;
        const version = extension?.packageJSON.version;
        const appInsightsKey = "c9a59792-25cc-4128-9c06-a44b9d4a1558";
        // Note that the TelemetryReporter respects the telemetry.EnableTelemetry setting
        // you can find an example of turning this off in the example workspace settings
        // example/example.code-workspace -> "telemtry.enableTelemetry": false
        this.reporter = new TelemetryReporter(extension.id, version, appInsightsKey);
    }

    public sendEvent(eventName: string): void {
        this.reporter.sendTelemetryEvent(eventName);
    }

    public sendError(area: string, error: Error): void {
        const props = {
            errorMessage: error.message,
            stackTrace: error.stack ? error.stack : "",
        };
        this.reporter.sendTelemetryErrorEvent(`ERROR/${area}`, props);
    }

    public dispose(): void {
        this.reporter.dispose();
    }
}
