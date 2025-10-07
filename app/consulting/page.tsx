import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Lightbulb } from "lucide-react"

export default async function Consulting() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
                    Homelab & Self-Hosting Consulting
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Hi, I'm Josh, founder of Compute For Humans. I help individuals and small businesses explore the world of homelabbing and self-hosted applications. 
                    In today's digital landscape, open-source solutions can effectively replace many paid services while giving you full control over your data and privacy.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 mb-12">
                <Card className="h-full">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                            <Lightbulb className="w-6 h-6 text-blue-500" />
                            <CardTitle>Define Your Project</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Let's start by understanding what you want to achieve. Common projects include:
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Setting up a media server (Plex, Jellyfin, etc.)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Hosting personal websites or applications</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Linux server setup and administration</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Home automation and IoT solutions</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="h-full">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                            <Clock className="w-6 h-6 text-blue-500" />
                            <CardTitle>Schedule Your Session</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-gray-600 dark:text-gray-300">
                                Most consultations last 1-2 hours. Need more time? No problem—we can adjust as needed.
                            </p>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Pro Tip</h3>
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                    For complex setups, check the duration of my related YouTube tutorials and add 30-60 minutes for hands-on guidance and troubleshooting.
                                </p>
                            </div>
                            <a
                                href="#" // Replace with your calendar link
                                className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                Book a Consultation
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400">
                    Homelabbing is an investment in your digital independence. While there are costs involved, the value of learning and the peace of mind from self-hosting is priceless.
                </p>
            </div>
        </div>
    )
}