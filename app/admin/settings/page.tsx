"use client";

import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Palette, Image, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">UI Settings</h1>
          <p className="text-green-600">Customize the appearance of your platform</p>
        </div>

        {/* General Settings */}
        <Card className="bg-green-50 border border-green-100 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="w-5 h-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName" className="text-green-600">
                Site Name
              </Label>
              <Input
                id="siteName"
                defaultValue="NYSC Jos North ICT CDS"
                className="bg-white border border-green-100 text-green-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription" className="text-green-600">
                Site Description
              </Label>
              <Textarea
                id="siteDescription"
                defaultValue="Jos North ICT CDS Biodata Management Platform"
                className="bg-white border border-green-100 text-green-800"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Branding */}
        <Card className="bg-green-50 border border-green-100 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Image className="w-5 h-5" />
              Branding
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logo" className="text-green-600">
                Logo URL
              </Label>
              <Input
                id="logo"
                placeholder="https://example.com/logo.png"
                className="bg-white border border-green-100 text-green-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="favicon" className="text-emerald-200">
                Favicon URL
              </Label>
              <Input
                id="favicon"
                placeholder="https://example.com/favicon.ico"
                className="bg-emerald-900/30 border-emerald-700/30 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Theme Colors */}
        <Card className="bg-green-50 border border-green-100 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Theme Colors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor" className="text-emerald-200">
                  Primary Color
                </Label>
                <div className="flex gap-2">
                  <Input id="primaryColor" type="color" defaultValue="#10b981" className="w-20 h-10" />
                  <Input defaultValue="#10b981" className="bg-white border border-green-100 text-green-800 flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryColor" className="text-emerald-200">
                  Secondary Color
                </Label>
                <div className="flex gap-2">
                  <Input id="secondaryColor" type="color" defaultValue="#14b8a6" className="w-20 h-10" />
                  <Input defaultValue="#14b8a6" className="bg-white border border-green-100 text-green-800 flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accentColor" className="text-emerald-200">
                  Accent Color
                </Label>
                <div className="flex gap-2">
                  <Input id="accentColor" type="color" defaultValue="#eab308" className="w-20 h-10" />
                  <Input defaultValue="#eab308" className="bg-white border border-green-100 text-green-800 flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="backgroundColor" className="text-emerald-200">
                  Background Color
                </Label>
                <div className="flex gap-2">
                  <Input id="backgroundColor" type="color" defaultValue="#064e3b" className="w-20 h-10" />
                  <Input defaultValue="#064e3b" className="bg-white border border-green-100 text-green-800 flex-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="bg-green-50 border border-green-100 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-green-800">Social Media Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facebook" className="text-green-600">
                Facebook
              </Label>
              <Input
                id="facebook"
                placeholder="https://facebook.com/your-page"
                className="bg-white border border-green-100 text-green-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter" className="text-emerald-200">
                Twitter
              </Label>
              <Input
                id="twitter"
                placeholder="https://twitter.com/your-handle"
                className="bg-emerald-900/30 border-emerald-700/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram" className="text-emerald-200">
                Instagram
              </Label>
              <Input
                id="instagram"
                placeholder="https://instagram.com/your-profile"
                className="bg-emerald-900/30 border-emerald-700/30 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="bg-green-600 hover:bg-green-500 text-white rounded-lg">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
